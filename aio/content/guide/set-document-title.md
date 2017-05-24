@title
Set the Document Title

@intro
Setting the document or window title using the Title service.

@description


{@a top}
Our app should be able to make the browser title bar say whatever we want it to say.
This cookbook explains how to do it.**See the <live-example name="cb-set-document-title"></live-example>**.

<table>

  <tr>

    <td>
      To see the browser title bar change in the live example,      
            open it again in the Plunker editor by clicking the icon in the upper right,      
            then pop out the preview window by clicking the blue 'X' button in the upper right corner.
    </td>


    <td>
      <img src='assets/images/devguide/plunker-switch-to-editor-button.png' width="200px" height="70px" alt="pop out the window" align="right">      </img>      <br>      </br>      <img src='assets/images/devguide/plunker-separate-window-button.png' width="200px" height="47px" alt="pop out the window" align="right">      </img>
    </td>


  </tr>


</table>

## The problem with *&lt;title&gt;*

The obvious approach is to bind a property of the component to the HTML `<title>` like this:
<code-example format=''>
  &lt;title&gt;{{This_Does_Not_Work}}&lt;/title&gt;
</code-example>

Sorry but that won't work.
The root component of our application is an element contained within the `<body>` tag.
The HTML `<title>` is in the document `<head>`, outside the body, making it inaccessible to Angular data binding.

We could grab the browser `document` object and set the title manually.
That's dirty and undermines our chances of running the app outside of a browser someday.
Running your app outside a browser means that you can take advantage of server-side
pre-rendering for near-instant first app render times and for SEO.  It means you could run from
inside a Web Worker to improve your app's responsiveness by using multiple threads.  And it
means that you could run your app inside Electron.js or Windows Universal to deliver it to the desktop.
## Use the *Title* service
Fortunately, Angular bridges the gap by providing a `Title` service as part of the *Browser platform*.
The [Title](api/platform-browser/index/Title-class) service is a simple class that provides an API
for getting and setting the current HTML document title:

* `getTitle() : string` &mdash; Gets the title of the current HTML document.
* `setTitle( newTitle : string )` &mdash; Sets the title of the current HTML document. 

Let's inject the `Title` service into the root `AppComponent` and expose a bindable `setTitle` method that calls it:


{@example 'cb-set-document-title/ts/src/app/app.component.ts' region='class'}

We bind that method to three anchor tags and, voilà!
<figure class='image-display'>
  <img src="assets/images/cookbooks/set-document-title/set-title-anim.gif" alt="Set title">  </img>
</figure>

Here's the complete solution

<md-tab-group>

  <md-tab label="src/main.ts">
    {@example 'cb-set-document-title/ts/src/main.ts'}
  </md-tab>


  <md-tab label="src/app/app.module.ts">
    {@example 'cb-set-document-title/ts/src/app/app.module.ts'}
  </md-tab>


  <md-tab label="src/app/app.component.ts">
    {@example 'cb-set-document-title/ts/src/app/app.component.ts'}
  </md-tab>


</md-tab-group>


## Why we provide the *Title* service in *bootstrap*

We generally recommended providing application-wide services in the root application component, `AppComponent`.

Here we recommend registering the title service during bootstrapping,
a location we reserve for configuring the runtime Angular environment.

That's exactly what we're doing.
The `Title` service is part of the Angular *browser platform*.
If we bootstrap our application into a different platform,
we'll have to provide a different `Title` service that understands the concept of a "document title" for that specific platform.
Ideally the application itself neither knows nor cares about the runtime environment.[Back to top](guide/set-document-title#top)