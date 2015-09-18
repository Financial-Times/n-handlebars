# next-handlebars

Enhanced handlebars for use in next applications

## Express applications

```
require('ft-next-handlebars')(app, options)
```

Where options may have the following properties

* `directory`: String - absolute path to the current application's working directory **REQUIRED**
* `partialsDir`: Array of directories containing partials. This is concatenated to the default value of `./bower_components/`
* `layoutsDir`: String - the directory in which express-handlebars layouts are contained
* `defaultLayout`: Name of the default layout to use. Defaults to `false`
* `helpers`: Map of custom helpers to add to handlebars (see below for a list those included by default)
* `viewsDirectory`: String - subdirectory where the application's views are stored (default `/views`)

Returns a promise which resolves when all partials in the supplied directories have been registered


### Other server side applications

To use the express-handlebars instance by itself (occassionally useful for consuming templates from bower_components outside of the context of an express app) use `require('ft-next-handlebars').standalone(options)`

A handlebars instance with all next helpers, but without partials, is also exposed at `require('ft-next-handlebars').handlebars`;

## Client side javascript

```
require('next-handlebars')(options)
```

Where options may have the following properties

* `helpers`: Map of custom helpers to add to handlebars (see below for a list those included by default)

Returns a handlebars instance

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
- `{{{usePartial 'path/to/partial'}}}` *Note* a '>' is not required in the path and you will normally need triple mustaches


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

### decodeHtmlEntities
Decodes a (very limited) safe list* of HTML entities into their respective characters (* = not `&`, `<`, `>`, `"`, `'` or ``)
- `{{decodeHtmlEntities 'lorem&nbsp;ipsum&nbsp;dolar'}}` outputs `lorem ipsum dolar`

## Logic helpers

### ifEquals
Outputs contents if a thing is equal to a value
- `{{#ifEquals thing 'value'}} some content {{else}} some fallback content {{/ifEquals}}`

### ifAll
Outputs contents if a number of things are truthy *Note that handlebars has a [slightly odd understanding of truthiness](http://stackoverflow.com/questions/21444525/what-is-truthy-or-falsy-in-mustache-and-handlebars)*
- `{{#ifAll thing1 thing2 thing3}} some content {{else}} some fallback content {{/ifAll}}`

### ifSome
Outputs contents if at least one of a number of things is truthy *Note that handlebars has a [slightly odd understanding of truthiness](http://stackoverflow.com/questions/21444525/what-is-truthy-or-falsy-in-mustache-and-handlebars)*
- `{{#ifSome thing1 thing2 thing3}} some content {{else}} some fallback content {{/ifSome}}`

## Iteration helpers

### slice
Loop through a subset of items
- `{{#slice items limit="2" offset="4"}} some content {{/slice}}
