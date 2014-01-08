/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Dom.Form Package
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2008-2013 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/* Module Meta Data
	type: Package
	importance: 4
	codeCompleteness: 100
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Dom.Form= package provides convenient methods for harvesting values from - and setting values for - many form elements in a single operation.

		*DEVELOPERS:* `Guang-Yu Xu`, `Chris van Rensburg`, `Ben Ilegbodu`
*/

Uize.module ({
	name:'Uize.Dom.Form',
	required:'Uize.Dom.Basics',
	builder:function () {
		'use strict';

		var
			/*** Variables for Scruncher Optimization ***/
				_doForAllFields,
				_Uize_Dom_Basics = Uize.Dom.Basics
		;

		return Uize.package ({
			doForAll:_doForAllFields = function (_root, _function) {
				_Uize_Dom_Basics.doForAll (
					_Uize_Dom_Basics.find ({
						root:_root,
						tagName:/^(TEXTAREA|SELECT|INPUT)$/,
						type:function (_type) {
							return _type != 'submit' && _type != 'button' && (_type != 'radio' || this.checked);
						}
					}),
					_function
				)
				/*?
					Static Methods
						Uize.Dom.Form.doForAll
							Iterates through all the form elements found within a specified root node, calling the specified function for each node and passing the node reference as a parameter.

							SYNTAX
							.....................................................
							Uize.Dom.Form.doForAll (rootNodeSTRorOBJ,actionFUNC);
							.....................................................

							The value of the =rootNodeSTRorOBJ= parameter can be a string, representing the =id= of the root node, or an object reference to the root node. The root node can be either a =form= tag, or any DOM node that contains all the desired form elements, such as a =div= or other type of element.

							An Example
								In the following example, there is a =form= tag containing a number of different form elements.

								SAMPLE HTML
								......................................................................................
								<form id="myForm">
									<input id="myForm-myText" name="myText" type="text" value="blah"/>
									<input id="myForm-myCheckbox" name="myCheckbox" type="checkbox" checked="checked"/>
									<select id="myForm-mySelect" name="mySelect">
										<option value="1">One</option>
										<option value="2" selected="selected">Two</option>
										<option value="3">Three</option>
									</select>
								</form>
								......................................................................................

								With the above HTML, you could call the method like this...

								............................................................
								Uize.Dom.Form.doForAll (
									function (node) {
										node.className = 'formElement';
										Uize.Dom.Basics.wire (node,'change',handleNodeChange);
									}
								);
								............................................................

								This snippet of code would set the =class= attribute of each node to "formElment" as well as wire the =handleNodeChange= function to the =onChange= event of each node.
				*/
			},

			getValues:function (_root,_useNodeId,_idPrefix) {
				var
					_result = {},
					_idPrefixIndex = _idPrefix ? _idPrefix.length : 0
				;
				_doForAllFields(
					_root,
					function (_node) {
						var _nodeId = _useNodeId && _node.type != 'radio' ? _node.id : _node.name;
						_result [_idPrefixIndex ? _nodeId.slice (_idPrefixIndex) : _nodeId] = _Uize_Dom_Basics.getValue (_node);
					}
				);
				return _result;
				/*?
					Static Methods
						Uize.Dom.Form.getValues
							Harvests the values for all form elements found within a specified root node, and packages them into an object.

							SYNTAX
							.......................................................
							valuesOBJ = Uize.Dom.Form.getValues (rootNodeSTRorOBJ);
							.......................................................

							The value of the =rootNodeSTRorOBJ= parameter can be a string, representing the =id= of the root node, or an object reference to the root node. The root node can be either a =form= tag, or any DOM node that contains all the desired form elements, such as a =div= or other type of element.

							By default, the keys of the values object generated by this method will be named according to the =name= attribute of the form elements from which values are harvested. However, different variations of this method also allow the =id= attribute to be used, and allow an optional prefix to be specified that should be removed when generating the key names.

							VARIATION 1
							.....................................................................
							valuesOBJ = Uize.Dom.Form.getValues (rootNodeSTRorOBJ,useNodeIdBOOL);
							.....................................................................

							When the optional =useNodeIdBOOL= parameter is specified, you can control whether or not the =id= attribute of form elements is used in naming the keys of the returned values object. Specifying the value =true= for this parameter will cause the =id= attribute to be used, while specifying the value =false= will cause the =name= attribute to be used.

							VARIATION 2
							...............................................................................
							valuesOBJ = Uize.Dom.Form.getValues (rootNodeSTRorOBJ,useNodeIdBOOL,prefixSTR);
							...............................................................................

							When the optional =prefixSTR= parameter is specified, you can specify a prefix that should be stripped off the ids or names of form elements when generating key names for the returned values object.

							An Example
								In the following example, there is a =form= tag containing a number of different form elements.

								SAMPLE HTML
								......................................................................................
								<form id="myForm">
									<input id="myForm-myText" name="myText" type="text" value="blah"/>
									<input id="myForm-myCheckbox" name="myCheckbox" type="checkbox" checked="checked"/>
									<select id="myForm-mySelect" name="mySelect">
										<option value="1">One</option>
										<option value="2" selected="selected">Two</option>
										<option value="3">Three</option>
									</select>
								</form>
								......................................................................................

								With the above HTML, the statement =Uize.Dom.Form.getValues ('myForm')= would produce the following object (here we're using form element names as keys)...

								.................................................
								// Uize.Dom.Form.getValues ('myForm') produces...
								{
									myText:'blah',
									myCheckbox:true,
									mySelect:'2'
								}
								.................................................

								The statement =Uize.Dom.Form.getValues ('myForm',true)= would produce the following object (here we're using form element ids as keys)...

								......................................................
								// Uize.Dom.Form.getValues ('myForm',true) produces...
								{
									'myForm-myText':'blah',
									'myForm-myCheckbox':true,
									'myForm-mySelect':'2'
								}
								......................................................

								The statement =Uize.Dom.Form.getValues ('myForm',true,'myForm-')= would produce the following object (here we're using form element ids as keys, and we're stripping off the specified ='myForm-'= prefix)...

								................................................................
								// Uize.Dom.Form.getValues ('myForm',true,'myForm-') produces...
								{
									myText:'blah',
									myCheckbox:true,
									mySelect:'2'
								}
								................................................................

							NOTES
							- see the corresponding =Uize.Dom.Form.setValues= static method
				*/
			},

			setEnabled:function (_root, _mustEnable) {
				_doForAllFields(
					_root,
					function (_node) {
						_Uize_Dom_Basics.setProperties(_node, {disabled:_mustEnable == false ? 'disabled' : ''});
					}
				)
				/*?
					Static Methods
						Uize.Dom.Form.setEnabled
							Enables or disables all of the form elements found within a specified root node, using the "disabled" node attribute.

							SYNTAX
							..............................................................
							Uize.Dom.Form.setEnabled (rootNodeSTRorOBJ,mustEnableANYTYPE);
							..............................................................

							The value of the =rootNodeSTRorOBJ= parameter can be a string, representing the =id= of the root node, or an object reference to the root node. The root node can be either a =form= tag, or any DOM node that contains all the desired form elements, such as a =div= or other type of element.

							While typically a Boolean, the =mustEnableANYTYPE= parameter can be of any type and the node(s) will be enabled if it resolves to =true=, and disabled if it resolves to =false= - with the exception of =undefined=, when the node(s) will be enabled (see explanation below).

							VARIATION
							............................................
							Uize.Dom.Form.setEnabled (rootNodeSTRorOBJ);
							............................................

							When no =mustEnableANYTYPE= parameter is specified (or when its value is =undefined=), the node(s) will be enabled.
				*/
			},

			setValues:function (_values,_idPrefix) {
				_idPrefix = _idPrefix || '';
				for (var _key in _values)
					_Uize_Dom_Basics.setValue (_idPrefix + _key,_values [_key])
				;
				/*?
					Static Methods
						Uize.Dom.Form.setValues
							Lets you conveniently set the values for a set of form elements, using a values object.

							SYNTAX
							....................................
							Uize.Dom.Form.setValues (valuesOBJ);
							....................................

							By default, the keys of the values object specified by the =valuesOBJ= parameter are used as the ids or names for identifying the form elements. So, for example, a values object with a key of =username= will set the value for the form element whose =id= or =name= is =username=.

							VARIATION
							..............................................
							Uize.Dom.Form.setValues (valuesOBJ,prefixSTR);
							..............................................

							When the optional =prefixSTR= parameter is specified, then a prefix can be specific that will be added before the names of the keys in the values object, when generating the ids or names of their corresponding form elements. For example, when the value ='myForm-'= is specified for the =prefixSTR= parameter, then a values object with a key of =username= will set the value for the form element whose =id= or =name= is =myForm-username=.

							An Example
								In the following example, there is a =form= tag containing a number of different form elements.

								SAMPLE HTML
								....................................................................
								<form id="myForm">
									<input id="myForm-myText" name="myText" type="text"/>
									<input id="myForm-myCheckbox" name="myCheckbox" type="checkbox"/>
									<select id="myForm-mySelect" name="mySelect">
										<option value="1">One</option>
										<option value="2">Two</option>
										<option value="3">Three</option>
									</select>
								</form>
								....................................................................

								SAMPLE JAVASCRIPT
								.........................
								Uize.Dom.Form.setValues (
									{
										myText:'blah',
										myCheckbox:true,
										mySelect:'2'
									},
									'myForm-'
								);
								.........................

								After the above JavaScript statement has been executed, the text input with the =id= of =myForm-myText= will be set to the value ='blah'=, the checkbox with the =id= of =myForm-myCheckbox= will be checked, and the second option of the select element with the =id= of =myForm-mySelect= will be selected.

							NOTES
							- see the corresponding =Uize.Dom.Form.getValues= static method
				*/
			}
		});
	}
});

