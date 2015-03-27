/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Test.Uize.Widget.HtmltCompiler Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2015 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/* Module Meta Data
	type: Test
	importance: 3
	codeCompleteness: 1
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Test.Uize.Widget.HtmltCompiler= module defines a suite of unit tests for the =Uize.Widget.HtmltCompiler= module.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'Uize.Test.Uize.Widget.HtmltCompiler',
	builder:function () {
		'use strict';

		/*** Utility Methods ***/
			function _htmlBindingsTest (_title,_widgetClassFeatures,_htmltSource,_expected) {
				return {
					title:_title,
					test:function () {
						var
							_WidgetClass = Uize.Widget.subclass ({
								mixins:Uize.Widget.mHtmlBindings,
								instanceMethods:{
									cssClass:function (_class) {return 'Widget-' + _class}
								}
							}).declare (_widgetClassFeatures),
							_template = Uize.Widget.HtmltCompiler.compile (
								_htmltSource,
								{widgetClass:_WidgetClass}
							),
							_widgetInstance = _WidgetClass ({idPrefix:'widget'})
						;
						return this.expect (
							_expected,
							_template.call (_widgetInstance,_widgetInstance.get ())
						);
					}
				};
			}

		return Uize.Test.resolve ({
			title:'Uize.Widget.HtmltCompiler Module Test',
			test:[
				Uize.Test.requiredModulesTest ([
					'Uize.Widget',
					'Uize.Widget.mHtmlBindings',
					'Uize.Widget.HtmltCompiler',
					'Uize.Util.Html.Encode',
					'Uize.Parse.Xml.NodeList'
				]),
				Uize.Test.staticMethodsTest ([
					['Uize.Widget.HtmltCompiler.compile',[
						{
							title:'The values of id attributes are prefixed with the idPrefix of the widget',
							test:[
								_htmlBindingsTest (
									'If the root node does not contain an id attribute, one is added and its value is set to the idPrefix of the widget',
									{},
									'<div></div>',
									'<div id="widget"></div>'
								),
								_htmlBindingsTest (
									'If the root node contains an id attribute with an empty value, its value is set to the idPrefix of the widget',
									{},
									'<div id=""></div>',
									'<div id="widget"></div>'
								),
								_htmlBindingsTest (
									'The values of all id attributes are prefixed with the idPrefix of the widget',
									{},
									'<div>' +
										'<div id="div1">DIV 1</div>' +
										'<div id="div2">DIV 2</div>' +
										'<div>' +
											'<div id="nestedDiv">' +
												'<span id="aSpan">A SPAN</span>' +
											'</div>' +
											'<input id="textInput"/>' +
											'<textarea id="textArea">A TEXTAREA</textarea>' +
											'<select id="aSelect">' +
												'<option id="anOption">AN OPTION</option>' +
											'</select>' +
										'</div>' +
									'</div>',
									'<div id="widget">' +
										'<div id="widget-div1">DIV 1</div>' +
										'<div id="widget-div2">DIV 2</div>' +
										'<div>' +
											'<div id="widget-nestedDiv">' +
												'<span id="widget-aSpan">A SPAN</span>' +
											'</div>' +
											'<input id="widget-textInput"/>' +
											'<textarea id="widget-textArea">A TEXTAREA</textarea>' +
											'<select id="widget-aSelect">' +
												'<option id="widget-anOption">AN OPTION</option>' +
											'</select>' +
										'</div>' +
									'</div>'
								)
							]
						},
						{
							title:'The values of class attributes are expanded by calling the cssClass method of the widget',
							test:[
								_htmlBindingsTest (
									'The values of class attributes for multiple nodes will be expanded',
									{},
									'<div>' +
										'<div class="foo1"></div>' +
										'<div class="foo2"></div>' +
										'<div>' +
											'<div class="foo3"></div>' +
										'</div>' +
									'</div>',
									'<div id="widget">' +
										'<div class="Widget-foo1"></div>' +
										'<div class="Widget-foo2"></div>' +
										'<div>' +
											'<div class="Widget-foo3"></div>' +
										'</div>' +
									'</div>'
								),
								_htmlBindingsTest (
									'When the values of class attributes contain multiple classes, each class will be expanded in separate calls to the cssClass method of the widget',
									{},
									'<div>' +
										'<div class="foo1A foo1B foo1C"></div>' +
										'<div class="foo2A foo2B"></div>' +
										'<div>' +
											'<div class="foo3A foo3B foo3C foo3D"></div>' +
										'</div>' +
									'</div>',
									'<div id="widget">' +
										'<div class="Widget-foo1A Widget-foo1B Widget-foo1C"></div>' +
										'<div class="Widget-foo2A Widget-foo2B"></div>' +
										'<div>' +
											'<div class="Widget-foo3A Widget-foo3B Widget-foo3C Widget-foo3D"></div>' +
										'</div>' +
									'</div>'
								)
							]
						},
						{
							title:'The values of state properties can be bound to nodes to replace their contents',
							test:[
								_htmlBindingsTest (
									'A state property can be bound to replace the contents of the root node',
									{
										stateProperties:{
											foo:{value:'bar'}
										},
										htmlBindings:{
											foo:''
										}
									},
									'<div></div>',
									'<div id="widget">bar</div>'
								),
								_htmlBindingsTest (
									'A state property can be bound to replace the contents of a child node',
									{
										stateProperties:{
											foo:{value:'bar'}
										},
										htmlBindings:{
											foo:'foo'
										}
									},
									'<div>' +
										'<div id="foo"></div>' +
									'</div>',
									'<div id="widget">' +
										'<div id="widget-foo">bar</div>' +
									'</div>'
								),
								_htmlBindingsTest (
									'A state property can be bound to replace the contents of multiple nodes',
									{
										stateProperties:{
											foo:{value:'bar'}
										},
										htmlBindings:{
											foo:['foo1','foo2','foo3']
										}
									},
									'<div>' +
										'<div id="foo1"></div>' +
										'<div id="foo2"></div>' +
										'<div>' +
											'<div id="foo3"></div>' +
										'</div>' +
									'</div>',
									'<div id="widget">' +
										'<div id="widget-foo1">bar</div>' +
										'<div id="widget-foo2">bar</div>' +
										'<div>' +
											'<div id="widget-foo3">bar</div>' +
										'</div>' +
									'</div>'
								),
								_htmlBindingsTest (
									'The value of a state property is HTML encoded when it is bound to replace the contents of a node',
									{
										stateProperties:{
											foo:{value:'Characters that need to be HTML-encoded: <&'}
										},
										htmlBindings:{
											foo:'foo'
										}
									},
									'<div>' +
										'<div id="foo"></div>' +
									'</div>',
									'<div id="widget">' +
										'<div id="widget-foo">Characters that need to be HTML-encoded: &lt;&amp;</div>' +
									'</div>'
								)
							]
						},
						{
							title:'The values of state properties can be bound to various types of form elements',
							test:[
								{
									title:'A state property can be bound to text input nodes',
									test:[
										_htmlBindingsTest (
											'A state property can be bound to a single text input node',
											{
												stateProperties:{
													foo:{value:'bar'}
												},
												htmlBindings:{
													foo:'foo'
												}
											},
											'<div>' +
												'<input id="foo" type="text"/>' +
											'</div>',
											'<div id="widget">' +
												'<input id="widget-foo" type="text" value="bar"/>' +
											'</div>'
										),
										_htmlBindingsTest (
											'A state property can be bound to multiple text input nodes',
											{
												stateProperties:{
													foo:{value:'bar'}
												},
												htmlBindings:{
													foo:['foo1','foo2','foo3']
												}
											},
											'<div>' +
												'<input id="foo1" type="text"/>' +
												'<input id="foo2" type="text"/>' +
												'<div>' +
													'<input id="foo3" type="text"/>' +
												'</div>' +
											'</div>',
											'<div id="widget">' +
												'<input id="widget-foo1" type="text" value="bar"/>' +
												'<input id="widget-foo2" type="text" value="bar"/>' +
												'<div>' +
													'<input id="widget-foo3" type="text" value="bar"/>' +
												'</div>' +
											'</div>'
										)
									]
								}
							]
						}
					]]
					/*
						- test value bindings to form elements
							- text input
							- textarea
							- checkbox
							- select (not yet supported)
						- test various binding types...
							- @attribute value bindings (@src, @href, @class)
							- html, innerHTML
							- className
							- ?, show
							- hide
							- style.*
							- readOnly
						- test child tag
					*/
				])
			]
		});
	}
});

