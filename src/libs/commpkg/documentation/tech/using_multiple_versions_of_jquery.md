{{= BackToPackageOverview }}

# Using multiple versions of jQuery

To avoid collisions with application code that uses a different version of
jQuery than what the Communication Service Package relies on, it is possible to
install multiple versions of jQuery simultaneosly and tell the Communication
Service Package which one it should be using.

This can be achieved by using ``jQuery.noConflict`` API. First, you'll need to
restore $ and jQuery namespaces when jQuery for Communication Service Package
is included onto the page.

```html
<script src="include/jQueryForAvayaClientServices.js"></script>
<script>
    var jQueryForAvayaClientServices = $.noConflict(true);
</script>
```

Then put it in use by Communication Service Package:

```html
<script src="include/AvayaClientServices.min.js"></script>
<script>
    AvayaClientServices.Base.Library.jQuery.setHandle(jQueryForAvayaClientServices);
</script>
```

This has to be done prior to any other initialization of the Communication Service Package. Aside from that, please:

* note that Communication Service Package won't start at all if major version of jQuery doesn't match with supported one;
* expect a warning if minor or patch version of jQuery doesn't match with supported one.

You aren't required to do any of these steps, Communication Service Package
will use available installation of jQuery unless explicitly told otherwise
(but above notes will apply).