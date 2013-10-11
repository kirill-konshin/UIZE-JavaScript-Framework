/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.String.Camel Package
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2008-2013 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/* Module Meta Data
	type: Package
	importance: 1
	codeCompleteness: 50
	docCompleteness: 70
*/

/*?
	Introduction
		The =Uize.String.Camel= module provides convenience methods for dealing with camelCased strings.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'Uize.String.Camel',
	builder:function () {
		'use strict';

		return Uize.package ({
			to:function (_source,_capFirstChar) {
				return (
					(Uize.isArray (_source) ? _source.join (' ') : _source).toLowerCase (
					).replace (
						/^\W+/,'' // remove leading non-word chars
					).replace (
						/\W+$/,'' // remove trailing non-word chars
					).replace (
						_capFirstChar ? /(^|\W+)./g : /\W+./g,
						function (_match) {return _match.slice (-1).toUpperCase ()}
					)
				);
				/*?
					Static Methods
						Uize.String.Camel.to
							Returns a string, that is the specified source string converted to a camelCase formatted string.

							SYNTAX
							................................................
							camelCaseSTR = Uize.String.Camel.to (sourceSTR);
							................................................

							This method removes all non-word characters separating words in the source string, capitalizes the first letters of the words, and lowercases all other letters.

							EXAMPLES
							..............................................................................
							Uize.String.Camel.to ('encode HTML entity');    // returns 'encodeHtmlEntity'
							Uize.String.Camel.to ('XML document');          // returns 'xmlDocument'
							Uize.String.Camel.to ('XML document',true);     // returns 'XmlDocument'
							Uize.String.Camel.to ('city, state, zip');      // returns 'cityStateZip'
							Uize.String.Camel.to ('www.uize.com');          // returns 'wwwUizeCom'
							Uize.String.Camel.to ('theme/css/button.css');  // returns 'themeCssButtonCss'
							Uize.String.Camel.to ('nav-arrow-horz-next');   // returns 'navArrowHorzNext'
							Uize.String.Camel.to ('json 2 XML');            // returns 'json2Xml'
							Uize.String.Camel.to ('--hyphens-are-cool--');  // returns 'hyphensAreCool'
							..............................................................................

							The above example illustrates how the method will behave with a variety of input values.

							VARIATION
							.................................................................
							camelCaseSTR = Uize.String.Camel.to (sourceSTR,capFirstCharBOOL);
							.................................................................

							By default, the first letter of the camelCased string is lowercase, although the optional =capFirstCharBOOL= parameter allows control over this behavior. Specify the value =true= for this parameter and the first letter of the camelCased string will be uppercase.

							VARIATION
							..........................................................
							camelCaseSTR = Uize.String.Camel.to (stringSegmentsARRAY);
							..........................................................

							In addition to being able to camelCase a source string, the =Uize.String.Camel.to= method can also generate a camelCase string from an array of string segments.

							EXAMPLE
							.........................................................................
							Uize.String.Camel.to (['city','state','zip']);  // returns 'cityStateZip'
							.........................................................................

							VARIATION
							...........................................................................
							camelCaseSTR = Uize.String.Camel.to (stringSegmentsARRAY,capFirstCharBOOL);
							...........................................................................

							Naturally, the optional =capFirstCharBOOL= parameter can also be used when the =stringSegmentsARRAY= parameter is specified.
				*/
			}
		});
	}
});

