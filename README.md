# n-handlebars [![CircleCI](https://circleci.com/gh/Financial-Times/n-handlebars.svg?style=svg)](https://circleci.com/gh/Financial-Times/n-handlebars)

Enhanced handlebars for use in next applications

## Express applications

```
require('n-handlebars')(app, options)
```

Where options may have the following properties

* `directory`: String - absolute path to the current application's working directory **REQUIRED**
* `partialsDir`: Array of directories containing partials. This is concatenated to the default value of `./bower_components/`
* `layoutsDir`: String - the directory in which express-handlebars layouts are contained
* `defaultLayout`: Name of the default layout to use. Defaults to `false`
* `helpers`: Map of custom helpers to add to handlebars (see below for a list those included by default)
* `viewsDirectory`: String - subdirectory where the application's views are stored (default `/views`)
* `limitToComponents`: Array - limit the bower components partials included to just the specified components (e.g. ['n-ui'])

Returns a promise which resolves when all partials in the supplied directories have been registered

To use the express-handlebars instance by itself (occassionally useful for consuming templates from bower_components outside of the context of an express app) use `require('n-handlebars').standalone(options)`

A handlebars instance with all next helpers, but without partials, is also exposed at `require('n-handlebars').handlebars`;

## Client side javascript

```
require('n-handlebars')(options)
```

Where options may have the following properties

* `helpers`: Map of custom helpers to add to handlebars (see below for a list those included by default)

Returns a handlebars instance

## Other server side applications

Should you need to use handlebars with all the next helpers but without next-express use `require('n-handlebars').handlebars(options)`, which has the same API a the client side module


# THE HELPERS

## Inheritance helpers

### Block inheritance
This is achieved by means of two helpers:

- `outputBlock` used in the parent template to indicate where content should be output. Can also define default content
- `defineBlock` used in the child template to define the desired output to insert into the block

```mustache
// parent.html
<header>thing</header>
{{#outputBlock 'my-block'}}default content{{/outputBlock}}
<footer>thing</footer>

// child.html
{{#defineBlock 'my-block'}}
	Mustaches to process: {{someVar}}
{{/defineBlock}}
{{> parent}}
```

### usePartial
Allows a partial to be selected based on the value of a variable
- `{{{usePartial variable path='path/to/partial'}}}`

If `variable` value is `foobar` then partial will be `path/to/partial/foobar`.
*Note* a '>' is not required in the path and you will normally need triple mustaches


## Content helpers

### dateformat
Outputting date objects as strings
- `{{#dateformat}}{{ a date object }}{{/dateformat}}` outputs an isoString
- `{{#dateformat "dddd, d mmmm, yyyy"}}{{ a date object }}{{/dateformat}}` outputs the date formatted as 'Tuesday, 3 February, 2014'

### encode
Encoding strings to be output safely in html
- `{{encode q mode='uriComponent'}}` outputs the result of `encodeURIComponent(q)` (`{{encode q }}` will also do this)
- `{{encode q mode='uri'}}` outputs the result of `encodeURI(q)`

### paragraphs
Outputting some paragraphs from a larger chunk of html, zero indexed
- `{{{paragraphs body start=0 end=1}}}` will output the first paragraph of `body`. *Note the triple mustaches*

### removeImageTags
Strips all image tags from a chunk of html
- `{{{removeImageTags body}}}` *Note the triple mustaches*

### resize
Replaces an image url with an image service url, serving an appropriately resized image
- `{{#resize 200}}http://images.com/pic.jpg{{/resize}}`

### json
Outputs an object as json.
- `{{json obj}}` - for use within data attributes and elsewhere in html (will convert '"' to '&quot;' etc..)
- `{{{json obj}}}` - for outputting the json unencoded

### concat
Concatenates strings.
- `{{concat str1 str2}}`

### decodeHtmlEntities
Decodes a (very limited) safe list* of HTML entities into their respective characters (* = not `&`, `<`, `>`, `"`, `'` or ``)
- `{{decodeHtmlEntities 'lorem&nbsp;ipsum&nbsp;dolar'}}` outputs `lorem ipsum dolar`

## Logic helpers

### ifEquals
Outputs contents if a thing is equal to a value
- `{{#ifEquals thing 'value'}} some content {{else}} some fallback content {{/ifEquals}}`

### unlessEquals
Outputs contents if a thing is not exactly equal to a value
- `{{#unlessEquals thing 'value'}} some content {{else}} some fallback content {{/unlessEquals}}`

### ifAll
Outputs contents if a number of things are truthy
- `{{#ifAll thing1 thing2 thing3}} some content {{else}} some fallback content {{/ifAll}}`

### ifSome
Outputs contents if at least one of a number of things is truthy
- `{{#ifSome thing1 thing2 thing3}} some content {{else}} some fallback content {{/ifSome}}`

### ifBool
Outputs contents if a complex boolean logic expression is satisfied. Uses string formatting to generate the expression
- `{{#ifBool thing1 thing2 "($0 && $1)"}} some content {{else}} some fallback content {{/ifBool}}`


## Iteration helpers

### slice
Loop through a subset of items
- `{{#slice items limit="2" offset="4"}} some content {{/slice}}`

### increment
Displays `@index` value added to given argument (e.g. an argument of `1` will display ordinal not cardinal numbers, i.e. values start from 1 not 0).
- `{{#each array}}{{#increment 1}}{{@index}}{{/increment}}{{/each}}`


## Presenter helpers

### presenter
Makes a presenter class available to the template for the current context
- example
```
		{{#presenter presenterPath context hashArguments}} //1
			<h3>{{@myPresenter.title}}</h3> //2
			<p>{{subheader}}</p> //3
			<ol>
				{{#with @myPresenter.items}} //4
					<li><p>{{relatedTitle}}</p></li>
				{{/with}}
			</ol>
		{{/presenter}}
```
1. Instantiating the presenter
presenterPath can either be a file from the root of the application, eg. `./presenters/my-presenter` or if in a bower component `component/presenters/my-presenter`.
context is the current data context - ie. @this
hashArguments is any data that you want to pass to the presenter from the template, eg. size='large' widths='1,2,3' (these can only be passed as strings)
Any hashArguments are added to the data context and passed to the presenter.

2. Retrieving data from the presenter
(swap myPresenter for the camel cased file name for your presenter)
@myPresenter.title will call the title function of your presenter and receive back the output of that function. This could be a text string for example.

3. Using current data context
the current data context is still available

4. Using an array from the presenter
existing helpers, eg. #each, #with #slice can be used with arrays passed back from the presenter.
