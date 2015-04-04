/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Widgets.Form.Input.Select.VisualSampler Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2015 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/* Module Meta Data
	type: Class
	importance: 1
	codeCompleteness: 5
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Widgets.Form.Input.Select.VisualSampler= class implements a visual sampler widget for the =Uize.Widgets.Form.Input.Select.Widget= class.

		*DEVELOPERS:*
*/

Uize.module ({
	name:'Uize.Widgets.Form.Input.Select.VisualSampler',
	superclass:'Uize.Widgets.VisualSampler.Widget',
	required:[
		'Uize.Widgets.Form.Input.Select.Widget',
		'Uize.Widgets.StateValues'
	],
	builder:function (_superclass) {
		'use strict';

		return _superclass.subclass ({
			omegastructor:function () {
				this.addStateCombinationSamples ({
					size:Uize.Widgets.StateValues.size,
					values:[
						[
							{
								name:'Option 1',
								value:'option1'
							},
							{
								name:'Option 2',
								value:'option2'
							},
							{
								name:'Option 3',
								value:'option3'
							}
						]
					]
				});
				this.addSample ({
					enabled:false,
					size:'large',
					values:[
						{
							name:'Option 1',
							value:'option1'
						},
						{
							name:'Option 2',
							value:'option2'
						},
						{
							name:'Option 3',
							value:'option3'
						}
					]
				});
			},

			set:{
				samplerWidgetClass:Uize.Widgets.Form.Input.Select.Widget
			}
		});
	}
});

