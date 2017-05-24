@title
Style Guide

@intro
Write Angular with style.

@description
Welcome to the Angular Style Guide

## Purpose

Looking for an opinionated guide to Angular syntax, conventions, and application structure?
Step right in!
This style guide presents our preferred conventions and, as importantly, explains why.
## Style vocabulary

Each guideline describes either a good or bad practice, and all have a consistent presentation.

The wording of each guideline indicates how strong the recommendation is.


~~~ {.s-rule.do}

**Do** is one that should always be followed.
_Always_ might be a bit too strong of a word.
Guidelines that literally should always be followed are extremely rare.
On the other hand, you need a really unusual case for breaking a *Do* guideline.


~~~



~~~ {.s-rule.consider}

**Consider** guidelines should generally be followed.
If you fully understand the meaning behind the guideline and have a good reason to deviate, then do so. Please strive to be consistent.


~~~



~~~ {.s-rule.avoid}

**Avoid** indicates something you should almost never do. Code examples to *avoid* have an unmistakeable red header.

~~~


## File structure conventions

Some code examples display a file that has one or more similarly named companion files. 
For example, `hero.component.ts` and `hero.component.html`.

The guideline will use the shortcut `hero.component.ts|html|css|spec` to represent those various files. Using this shortcut makes this guide's file structures easier to read and more terse.



{@a toc}
## Table of contents

  1. [Single responsibility](guide/style-guide#single-responsibility)
  1. [Naming](guide/style-guide#naming)
  1. [Coding conventions](guide/style-guide#coding-conventions)
  1. [App structure and Angular modules](guide/style-guide#application-structure-and-angular-modules)
  1. [Components](guide/style-guide#components)
  1. [Directives](guide/style-guide#directives)
  1. [Services](guide/style-guide#services)
  1. [Data services](guide/style-guide#data-services)
  1. [Lifecycle hooks](guide/style-guide#lifecycle-hooks)
  1. [Appendix](guide/style-guide#appendix)

## Single responsibility

Apply the 
<a href="https://wikipedia.org/wiki/Single_responsibility_principle" target="_blank"><i>Single Responsibility Principle</i> (SRP)</a>
to all components, services, and other symbols. 
This helps make the app cleaner, easier to read and maintain, and more testable.

### <a id="01-01"></a>_Rule of One_
#### <a href="#01-01">Style 01-01</a>

~~~ {.s-rule.do}

**Do** define one thing, such as a service or component, per file.


~~~



~~~ {.s-rule.consider}

**Consider** limiting files to 400 lines of code.


~~~


<div class='s-why'>
  **Why?** One component per file makes it far easier to read, maintain, and avoid   
    collisions with teams in source control.  
    
</div>


<div class='s-why'>
  **Why?** One component per file avoids hidden bugs that often arise when combining components in a file where they may share variables, create unwanted closures, or unwanted coupling with dependencies.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** A single component can be the default export for its file which facilitates lazy loading with the router.
</div>

The key is to make the code more reusable, easier to read, and less mistake prone.

The following *negative* example defines the `AppComponent`, bootstraps the app, defines the `Hero` model object, and loads heroes from the server ... all in the same file. *Don't do this*.


{@example 'style-guide/ts/src/01-01/app/heroes/hero.component.avoid.ts'}

It is a better practice to redistribute the component and its 
supporting classes into their own, dedicated files.

<md-tab-group>

  <md-tab label="main.ts">
    {@example 'style-guide/ts/src/01-01/main.ts'}
  </md-tab>


  <md-tab label="app/app.module.ts">
    {@example 'style-guide/ts/src/01-01/app/app.module.ts'}
  </md-tab>


  <md-tab label="app/app.component.ts">
    {@example 'style-guide/ts/src/01-01/app/app.component.ts'}
  </md-tab>


  <md-tab label="app/heroes/heroes.component.ts">
    {@example 'style-guide/ts/src/01-01/app/heroes/heroes.component.ts'}
  </md-tab>


  <md-tab label="app/heroes/shared/hero.service.ts">
    {@example 'style-guide/ts/src/01-01/app/heroes/shared/hero.service.ts'}
  </md-tab>


  <md-tab label="app/heroes/shared/hero.model.ts">
    {@example 'style-guide/ts/src/01-01/app/heroes/shared/hero.model.ts'}
  </md-tab>


  <md-tab label="app/heroes/shared/mock-heroes.ts">
    {@example 'style-guide/ts/src/01-01/app/heroes/shared/mock-heroes.ts'}
  </md-tab>


</md-tab-group>

As the app grows, this rule becomes even more important.
<a href="#toc">Back to top</a>
### <a id="01-02"></a>Small functions
#### <a href="#01-02">Style 01-02</a>

~~~ {.s-rule.do}

**Do** define small functions


~~~



~~~ {.s-rule.consider}

**Consider** limiting to no more than 75 lines.


~~~


<div class='s-why'>
  **Why?** Small functions are easier to test, especially when they do one thing and serve one purpose.  
    
</div>


<div class='s-why'>
  **Why?** Small functions promote reuse.  
    
</div>


<div class='s-why'>
  **Why?** Small functions are easier to read.  
    
</div>


<div class='s-why'>
  **Why?** Small functions are easier to maintain.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Small functions help avoid hidden bugs that come with large functions that share variables with external scope, create unwanted closures, or unwanted coupling with dependencies.  
    
</div>

<a href="#toc">Back to top</a>
## Naming

Naming conventions are hugely important to maintainability and readability. This guide recommends naming conventions for the file name and the symbol name.

### <a id="02-01"></a>General Naming Guidelines
#### <a href="#02-01">Style 02-01</a>


~~~ {.s-rule.do}

**Do** use consistent names for all symbols.


~~~



~~~ {.s-rule.do}

**Do** follow a pattern that describes the symbol's feature then its type. The recommended pattern is `feature.type.ts`.


~~~


<div class='s-why'>
  **Why?** Naming conventions help provide a consistent way to find content at a glance. Consistency within the project is vital. Consistency with a team is important. Consistency across a company provides tremendous efficiency.  
    
</div>


<div class='s-why'>
  **Why?** The naming conventions should simply help find desired code faster and make it easier to understand.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Names of folders and files should clearly convey their intent. For example, `app/heroes/hero-list.component.ts` may contain a component that manages a list of heroes.  
    
</div>

<a href="#toc">Back to top</a>
### <a id="02-02"></a>Separate file names with dots and dashes
#### <a href="#02-02">Style 02-02</a>


~~~ {.s-rule.do}

**Do** use dashes to separate words in the descriptive name.


~~~



~~~ {.s-rule.do}

**Do** use dots to separate the descriptive name from the type.


~~~



~~~ {.s-rule.do}

**Do** use consistent type names for all components following a pattern that describes the component's feature then its type. A recommended pattern is `feature.type.ts`.


~~~



~~~ {.s-rule.do}

**Do** use conventional type names including `.service`, `.component`, `.pipe`, `.module`, and `.directive`. 
Invent additional type names if you must but take care not to create too many.


~~~


<div class='s-why'>
  **Why?** Type names provide a consistent way to quickly identify what is in the file.  
    
</div>


<div class='s-why'>
  **Why?** Type names make it easy to find a specific file type using an editor or IDE's fuzzy search techniques.  
    
</div>


<div class='s-why'>
  **Why?** Unabbreviated type names such as `.service` are descriptive and unambiguous.  
    Abbreviations such as `.srv`, `.svc`, and `.serv` can be confusing.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Type names provide pattern matching for any automated tasks.  
    
</div>

<a href="#toc">Back to top</a>
### <a id="02-03"></a>Symbols and file names
#### <a href="#02-03">Style 02-03</a>


~~~ {.s-rule.do}

**Do** use consistent names for all assets named after what they represent.


~~~



~~~ {.s-rule.do}

**Do** use upper camel case for class names.


~~~



~~~ {.s-rule.do}

**Do** match the name of the symbol to the name of the file.


~~~



~~~ {.s-rule.do}

**Do** append the symbol name with the conventional suffix (such as `Component`, 
`Directive`, `Module`, `Pipe`, or `Service`) for a thing of that type.


~~~



~~~ {.s-rule.do}

**Do** give the filename the conventional suffix (such as `.component.ts`, `.directive.ts`, 
`.module.ts`, `.pipe.ts`, or `.service.ts`) for a file of that type.

~~~


<div class='s-why'>
  **Why?** Consistent conventions make it easy to quickly identify   
    and reference assets of different types.  
    
</div>


<table width="100%">

  <col width="50%">

  </col>


  <col width="50%">

  </col>


  <tr>

    <th>
      Symbol Name
    </th>


    <th>
      File Name
    </th>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @Component({ ... })        
                export class AppComponent { }
      </code-example>


    </td>


    <td>
      app.component.ts
    </td>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @Component({ ... })        
                export class HeroesComponent { }
      </code-example>


    </td>


    <td>
      heroes.component.ts
    </td>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @Component({ ... })        
                export class HeroListComponent { }
      </code-example>


    </td>


    <td>
      hero-list.component.ts
    </td>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @Component({ ... })        
                export class HeroDetailComponent { }
      </code-example>


    </td>


    <td>
      hero-detail.component.ts
    </td>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @Directive({ ... })        
                export class ValidationDirective { }
      </code-example>


    </td>


    <td>
      validation.directive.ts
    </td>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @NgModule({ ... })        
                export class AppModule
      </code-example>


    </td>


    <td>
      app.module.ts
    </td>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @Pipe({ name: 'initCaps' })        
                export class InitCapsPipe implements PipeTransform { }
      </code-example>


    </td>


    <td>
      init-caps.pipe.ts
    </td>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @Injectable()        
                export class UserProfileService { }
      </code-example>


    </td>


    <td>
      user-profile.service.ts
    </td>


  </tr>


</table>

<a href="#toc">Back to top</a>
### <a id="02-04"></a>Service names
#### <a href="#02-04">Style 02-04</a>


~~~ {.s-rule.do}

**Do** use consistent names for all services named after their feature.


~~~



~~~ {.s-rule.do}

**Do** suffix a service class name with Service. 
For example, something that gets data or heroes 
should be called a `DataService` or a `HeroService`.

A few terms are unambiguously services. They typically 
indicate agency by ending in "er". You may prefer to name 
a service that logs messages `Logger` rather than `LoggerService`. 
Decide if this exception is agreeable in your project. 
As always, strive for consistency.


~~~


<div class='s-why'>
  **Why?** Provides a consistent way to quickly identify and reference services.  
    
</div>


<div class='s-why'>
  **Why?** Clear service names such as `Logger` do not require a suffix.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Service names such as `Credit` are nouns and require a suffix and should be named with a suffix when it is not obvious if it is a service or something else.  
    
</div>


<table width="100%">

  <col width="50%">

  </col>


  <col width="50%">

  </col>


  <tr>

    <th>
      Symbol Name
    </th>


    <th>
      File Name
    </th>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @Injectable()        
                export class HeroDataService { }
      </code-example>


    </td>


    <td>
      hero-data.service.ts
    </td>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @Injectable()        
                export class CreditService { }
      </code-example>


    </td>


    <td>
      credit.service.ts
    </td>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @Injectable()        
                export class Logger { }
      </code-example>


    </td>


    <td>
      logger.service.ts
    </td>


  </tr>


</table>

<a href="#toc">Back to top</a>
### <a id="02-05"></a>Bootstrapping
#### <a href="#02-05">Style 02-05</a>


~~~ {.s-rule.do}

**Do** put bootstrapping and platform logic for the app in a file named `main.ts`.


~~~



~~~ {.s-rule.do}

**Do** include error handling in the bootstrapping logic.


~~~



~~~ {.s-rule.avoid}

**Avoid** putting app logic in the `main.ts`. Instead, consider placing it in a component or service.


~~~


<div class='s-why'>
  **Why?** Follows a consistent convention for the startup logic of an app.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Follows a familiar convention from other technology platforms.  
    
</div>



{@example 'style-guide/ts/src/02-05/main.ts'}

<a href="#toc">Back to top</a>
### <a id="02-06"></a>Directive selectors
#### <a href="#02-06">Style 02-06</a>


~~~ {.s-rule.do}

**Do** Use lower camel case for naming the selectors of directives.


~~~


<div class='s-why'>
  **Why?** Keeps the names of the properties defined in the directives that are bound to the view consistent with the attribute names.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** The Angular HTML parser is case sensitive and will recognize lower camel case.  
    
</div>

<a href="#toc">Back to top</a>
### <a id="02-07"></a>Custom prefix for components
#### <a href="#02-07">Style 02-07</a>


~~~ {.s-rule.do}

**Do** use a hyphenated, lowercase element selector value (e.g. `admin-users`). 



~~~



~~~ {.s-rule.do}

**Do** use a custom prefix for a component selector. 
For example, the prefix `toh` represents from **T**our **o**f **H**eroes and the prefix `admin` represents an admin feature area.


~~~



~~~ {.s-rule.do}

**Do** use a prefix that identifies the feature area or the app itself.


~~~


<div class='s-why'>
  **Why?** Prevents element name collisions with components in other apps and with native HTML elements.  
    
</div>


<div class='s-why'>
  **Why?** Makes it easier to promote and share the component in other apps.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Components are easy to identify in the DOM.  
    
</div>



{@example 'style-guide/ts/src/02-07/app/heroes/hero.component.avoid.ts' region='example'}



{@example 'style-guide/ts/src/02-07/app/users/users.component.avoid.ts' region='example'}



{@example 'style-guide/ts/src/02-07/app/heroes/hero.component.ts' region='example'}



{@example 'style-guide/ts/src/02-07/app/users/users.component.ts' region='example'}

### <a id="02-08"></a>Custom prefix for directives
#### <a href="#02-08">Style 02-08</a>


~~~ {.s-rule.do}

**Do** use a custom prefix for the selector of directives (e.g, the prefix `toh` from **T**our **o**f **H**eroes).


~~~



~~~ {.s-rule.do}

**Do** spell non-element selectors in lower camel case unless the selector is meant to match a native HTML attribute.


~~~


<div class='s-why'>
  **Why?** Prevents name collisions.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Directives are easily identified.  
    
</div>



{@example 'style-guide/ts/src/02-08/app/shared/validate.directive.avoid.ts' region='example'}



{@example 'style-guide/ts/src/02-08/app/shared/validate.directive.ts' region='example'}

<a href="#toc">Back to top</a>
### <a id="02-09"></a>Pipe names
#### <a href="#02-09">Style 02-09</a>


~~~ {.s-rule.do}

**Do** use consistent names for all pipes, named after their feature.


~~~


<div class='s-why' class='s-why-last'>
  **Why?** Provides a consistent way to quickly identify and reference pipes.  
    
</div>


<table width="100%">

  <col width="50%">

  </col>


  <col width="50%">

  </col>


  <tr>

    <th>
      Symbol Name
    </th>


    <th>
      File Name
    </th>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @Pipe({ name: 'ellipsis' })        
                export class EllipsisPipe implements PipeTransform { }
      </code-example>


    </td>


    <td>
      ellipsis.pipe.ts
    </td>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @Pipe({ name: 'initCaps' })        
                export class InitCapsPipe implements PipeTransform { }
      </code-example>


    </td>


    <td>
      init-caps.pipe.ts
    </td>


  </tr>


</table>

<a href="#toc">Back to top</a>
### <a id="02-10"></a>Unit test file names
#### <a href="#02-10">Style 02-10</a>


~~~ {.s-rule.do}

**Do** name test specification files the same as the component they test.


~~~



~~~ {.s-rule.do}

**Do** name test specification files with a suffix of `.spec`.


~~~


<div class='s-why'>
  **Why?** Provides a consistent way to quickly identify tests.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Provides pattern matching for [karma](http://karma-runner.github.io/) or other test runners.  
    
</div>


<table width="100%">

  <col width="50%">

  </col>


  <col width="50%">

  </col>


  <tr>

    <th>
      Symbol Name
    </th>


    <th>
      File Name
    </th>


  </tr>


  <tr style=top>

    <td>
      Components
    </td>


    <td>
      heroes.component.spec.ts      hero-list.component.spec.ts      hero-detail.component.spec.ts
    </td>


  </tr>


  <tr style=top>

    <td>
      Services
    </td>


    <td>
      logger.service.spec.ts      hero.service.spec.ts      filter-text.service.spec.ts
    </td>


  </tr>


  <tr style=top>

    <td>
      Pipes
    </td>


    <td>
      ellipsis.pipe.spec.ts      init-caps.pipe.spec.ts
    </td>


  </tr>


</table>

<a href="#toc">Back to top</a>
### <a id="02-11"></a>_End-to-End_ (E2E) test file names
#### <a href="#02-11">Style 02-11</a>


~~~ {.s-rule.do}

**Do** name end-to-end test specification files after the feature they test with a suffix of `.e2e-spec`.


~~~


<div class='s-why'>
  **Why?** Provides a consistent way to quickly identify end-to-end tests.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Provides pattern matching for test runners and build automation.  
    
</div>


<table width="100%">

  <col width="50%">

  </col>


  <col width="50%">

  </col>


  <tr>

    <th>
      Symbol Name
    </th>


    <th>
      File Name
    </th>


  </tr>


  <tr style=top>

    <td>
      End to End Tests
    </td>


    <td>
      app.e2e-spec.ts      heroes.e2e-spec.ts
    </td>


  </tr>


</table>

<a href="#toc">Back to top</a>
### <a id="02-12"></a>Angular _NgModule_ names
#### <a href="#02-12">Style 02-12</a>


~~~ {.s-rule.do}

**Do** append the symbol name with the suffix `Module`.


~~~



~~~ {.s-rule.do}

**Do** give the file name the `.module.ts` extension.


~~~



~~~ {.s-rule.do}

**Do** name the module after the feature and folder it resides in.


~~~


<div class='s-why'>
  **Why?** Provides a consistent way to quickly identify and reference modules.  
    
</div>


<div class='s-why'>
  **Why?** Upper camel case is conventional for identifying objects that can be instantiated using a constructor.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Easily identifies the module as the root of the same named feature.  
    
</div>



~~~ {.s-rule.do}

**Do** suffix a _RoutingModule_ class name with `RoutingModule`.


~~~



~~~ {.s-rule.do}

**Do** end the filename of a _RoutingModule_ with `-routing.module.ts`.


~~~


<div class='s-why' class='s-why-last'>
  **Why?** A `RoutingModule` is a module dedicated exclusively to configuring the Angular router.  
    A consistent class and file name convention make these modules easy to spot and verify.
</div>


<table width="100%">

  <col width="50%">

  </col>


  <col width="50%">

  </col>


  <tr>

    <th>
      Symbol Name
    </th>


    <th>
      File Name
    </th>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @NgModule({ ... })        
                export class AppModule { }
      </code-example>


    </td>


    <td>
      app.module.ts
    </td>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @NgModule({ ... })        
                export class HeroesModule { }
      </code-example>


    </td>


    <td>
      heroes.module.ts
    </td>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @NgModule({ ... })        
                export class VillainsModule { }
      </code-example>


    </td>


    <td>
      villains.module.ts
    </td>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @NgModule({ ... })        
                export class AppRoutingModule { }
      </code-example>


    </td>


    <td>
      app-routing.module.ts
    </td>


  </tr>


  <tr style=top>

    <td>

      <code-example>
        @NgModule({ ... })        
                export class HeroesRoutingModule { }
      </code-example>


    </td>


    <td>
      heroes-routing.module.ts        
    </td>


  </tr>


</table>

<a href="#toc">Back to top</a>
## Coding conventions

Have consistent set of coding, naming, and whitespace conventions.

### <a id="03-01"></a>Classes
#### <a href="#03-01">Style 03-01</a>


~~~ {.s-rule.do}

**Do** use upper camel case when naming classes.


~~~


<div class='s-why'>
  **Why?** Follows conventional thinking for class names.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Classes can be instantiated and construct an instance.   
    By convention, upper camel case indicates a constructable asset.  
    
</div>



{@example 'style-guide/ts/src/03-01/app/core/exception.service.avoid.ts' region='example'}



{@example 'style-guide/ts/src/03-01/app/core/exception.service.ts' region='example'}

<a href="#toc">Back to top</a>
### <a id="03-02"></a>Constants
#### <a href="#03-02">Style 03-02</a>


~~~ {.s-rule.do}

**Do** declare variables with `const` if their values should not change during the application lifetime.


~~~


<div class='s-why'>
  **Why?** Conveys to readers that the value is invariant.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** TypeScript helps enforce that intent by requiring immediate initialization and by  
    preventing subsequent re-assignment.  
    
</div>



~~~ {.s-rule.consider}

**Consider** spelling `const` variables in lower camel case.


~~~


<div class='s-why'>
  **Why?** Lower camel case variable names (`heroRoutes`) are easier to read and understand  
    than the traditional UPPER_SNAKE_CASE names (`HERO_ROUTES`).  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** The tradition of naming constants in UPPER_SNAKE_CASE reflects  
    an era before the modern IDEs that quickly reveal the `const` declaration.  
    TypeScript itself prevents accidental reassignment.   
    
</div>



~~~ {.s-rule.do}

**Do** tolerate _existing_ `const` variables that are spelled in UPPER_SNAKE_CASE.


~~~


<div class='s-why' class='s-why-last'>
  **Why?** The tradition of UPPER_SNAKE_CASE remains popular and pervasive,  
    especially in third party modules.  
    It is rarely worth the effort to change them at the risk of breaking existing code and documentation.  
    
</div>



{@example 'style-guide/ts/src/03-02/app/core/data.service.ts'}

<a href="#toc">Back to top</a>
### <a id="03-03"></a>Interfaces
#### <a href="#03-03">Style 03-03</a>


~~~ {.s-rule.do}

**Do** name an interface using upper camel case.


~~~



~~~ {.s-rule.consider}

**Consider** naming an interface without an `I` prefix.


~~~



~~~ {.s-rule.consider}

**Consider** using a class instead of an interface. 


~~~


<div class='s-why'>
  **Why?** <a href="https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines" target="_blank">TypeScript guidelines</a>   
    discourage the `I` prefix.  
    
</div>


<div class='s-why'>
  **Why?** A class alone is less code than a _class-plus-interface_.  
    
</div>


<div class='s-why'>
  **Why?** A class can act as an interface (use `implements` instead of `extends`).  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** An interface-class can be a provider lookup token in Angular dependency injection.  
    
</div>



{@example 'style-guide/ts/src/03-03/app/core/hero-collector.service.avoid.ts' region='example'}



{@example 'style-guide/ts/src/03-03/app/core/hero-collector.service.ts' region='example'}

<a href="#toc">Back to top</a>
### <a id="03-04"></a>Properties and methods
#### <a href="#03-04">Style 03-04</a>


~~~ {.s-rule.do}

**Do** use lower camel case to name properties and methods.


~~~



~~~ {.s-rule.avoid}

**Avoid** prefixing private properties and methods with an underscore.


~~~


<div class='s-why'>
  **Why?** Follows conventional thinking for properties and methods.  
    
</div>


<div class='s-why'>
  **Why?** JavaScript lacks a true private property or method.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** TypeScript tooling makes it easy to identify private vs public properties and methods.  
    
</div>



{@example 'style-guide/ts/src/03-04/app/core/toast.service.avoid.ts' region='example'}



{@example 'style-guide/ts/src/03-04/app/core/toast.service.ts' region='example'}

<a href="#toc">Back to top</a>
### <a id="03-06"></a>Import line spacing
#### <a href="#03-06">Style 03-06</a>


~~~ {.s-rule.consider}

**Consider** leaving one empty line between third party imports and application imports.


~~~



~~~ {.s-rule.consider}

**Consider** listing import lines alphabetized by the module.


~~~



~~~ {.s-rule.consider}

**Consider** listing destructured imported symbols alphabetically.


~~~


<div class='s-why'>
  **Why?** The empty line separates _your_ stuff from _their_ stuff.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Alphabetizing makes it easier to read and locate symbols.  
    
</div>



{@example 'style-guide/ts/src/03-06/app/heroes/shared/hero.service.avoid.ts' region='example'}



{@example 'style-guide/ts/src/03-06/app/heroes/shared/hero.service.ts' region='example'}

<a href="#toc">Back to top</a>
## Application structure and Angular modules

Have a near-term view of implementation and a long-term vision. Start small but keep in mind where the app is heading down the road.

All of the app's code goes in a folder named `src`. 
All feature areas are in their own folder, with their own Angular module. 

All content is one asset per file. Each component, service, and pipe is in its own file. 
All third party vendor scripts are stored in another folder and not in the `src` folder. 
You didn't write them and you don't want them cluttering `src`. 
Use the naming conventions for files in this guide.
<a href="#toc">Back to top</a>
### <a id="04-01"></a>_LIFT_
#### <a href="#04-01">Style 04-01</a>


~~~ {.s-rule.do}

**Do** structure the app such that you can `L`ocate code quickly, 
`I`dentify the code at a glance, 
keep the `F`lattest structure you can, and 
`T`ry to be DRY.


~~~



~~~ {.s-rule.do}

**Do** define the structure to follow these four basic guidelines, listed in order of importance.


~~~


<div class='s-why' class='s-why-last'>
  **Why?** LIFT Provides a consistent structure that scales well, is modular, and makes it easier to increase developer efficiency by finding code quickly.   
    To confirm your intuition about a particular structure, ask:   
    _can I quickly open and start work in all of the related files for this feature_?  
    
</div>

<a href="#toc">Back to top</a>
### <a id="04-02"></a>Locate
#### <a href="#04-02">Style 04-02</a>


~~~ {.s-rule.do}

**Do** make locating code intuitive, simple and fast.


~~~


<div class='s-why' class='s-why-last'>
  **Why?**    
    To work efficiently you must be able to find files quickly,   
    especially when you do not know (or do not remember) the file _names_.   
    Keeping related files near each other in an intuitive location saves time.   
    A descriptive folder structure makes a world of difference to you and the people who come after you.  
    
</div>

<a href="#toc">Back to top</a>
### <a id="04-03"></a>Identify
#### <a href="#04-03">Style 04-03</a>


~~~ {.s-rule.do}

**Do** name the file such that you instantly know what it contains and represents.


~~~



~~~ {.s-rule.do}

**Do** be descriptive with file names and keep the contents of the file to exactly one component.


~~~



~~~ {.s-rule.avoid}

**Avoid** files with multiple components, multiple services, or a mixture.


~~~


<div class='s-why' class='s-why-last'>
  **Why?** Spend less time hunting and pecking for code, and become more efficient.   
    Longer file names are far better than _short-but-obscure_ abbreviated names.  
    
</div>


It may be advantageous to deviate from the _one-thing-per-file_ rule when 
you have a set of small, closely-related features that are better discovered and understood
in a single file than as multiple files. Be wary of this loophole.
<a href="#toc">Back to top</a>
### <a id="04-04"></a>Flat
#### <a href="#04-04">Style 04-04</a>


~~~ {.s-rule.do}

**Do** keep a flat folder structure as long as possible.


~~~



~~~ {.s-rule.consider}

**Consider** creating sub-folders when a folder reaches seven or more files.


~~~



~~~ {.s-rule.consider}

**Consider** configuring the IDE to hide distracting, irrelevant files such as generated `.js` and `.js.map` files.


~~~


<div class='s-why' class='s-why-last'>
  **Why?** No one wants to search for a file through seven levels of folders.   
    A flat structure is easy to scan.  
      
    On the other hand,  
    <a href="https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two" target="_blank">psychologists believe</a>  
    that humans start to struggle when the number of adjacent interesting things exceeds nine.  
    So when a folder has ten or more files, it may be time to create subfolders.   
      
    Base your decision on your comfort level.   
    Use a flatter structure until there is an obvious value to creating a new folder.  
    
</div>

<a href="#toc">Back to top</a>
### <a id="04-05"></a>_T-DRY_ (Try to be _DRY_)
#### <a href="#04-05">Style 04-05</a>


~~~ {.s-rule.do}

**Do** be DRY (Don't Repeat Yourself)


~~~



~~~ {.s-rule.avoid}

**Avoid** being so DRY that you sacrifice readability.


~~~


<div class='s-why' class='s-why-last'>
  **Why?** Being DRY is important, but not crucial if it sacrifices the other elements of LIFT.  
    That's why it's called _T-DRY_.   
    For example, it's redundant to name a component, `hero-view.component.html` because a component is obviously a view.   
    But if something is not obvious or departs from a convention, then spell it out.  
    
</div>

<a href="#toc">Back to top</a>
### <a id="04-06"></a>Overall structural guidelines
#### <a href="#04-06">Style 04-06</a>


~~~ {.s-rule.do}

**Do** start small but keep in mind where the app is heading down the road.


~~~



~~~ {.s-rule.do}

**Do** have a near term view of implementation and a long term vision.


~~~



~~~ {.s-rule.do}

**Do** put all of the app's code in a folder named `src`.


~~~



~~~ {.s-rule.consider}

**Consider** creating a folder for a component when it has multiple accompanying files (`.ts`, `.html`, `.css` and `.spec`).


~~~


<div class='s-why'>
  **Why?** Helps keep the app structure small and easy to maintain in the early stages, while being easy to evolve as the app grows.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Components often have four files (e.g. `*.html`, `*.css`, `*.ts`, and `*.spec.ts`) and can clutter a folder quickly.  
    
</div>



{@a file-tree}
Here is a compliant folder and file structure:

<aio-filetree>

  <aio-folder>
    &lt;project root&gt;
    <aio-folder>
      src
      <aio-folder>
        app
        <aio-folder>
          core
          <aio-file>
            core.module.ts
          </aio-file>


          <aio-file>
            exception.service.ts|spec.ts
          </aio-file>


          <aio-file>
            user-profile.service.ts|spec.ts
          </aio-file>


        </aio-folder>


        <aio-folder>
          heroes
          <aio-folder>
            hero
            <aio-file>
              hero.component.ts|html|css|spec.ts
            </aio-file>


          </aio-folder>


          <aio-folder>
            hero-list
            <aio-file>
              hero-list.component.ts|html|css|spec.ts
            </aio-file>


          </aio-folder>


          <aio-folder>
            shared
            <aio-file>
              hero-button.component.ts|html|css|spec.ts
            </aio-file>


            <aio-file>
              hero.model.ts
            </aio-file>


            <aio-file>
              hero.service.ts|spec.ts
            </aio-file>


          </aio-folder>


          <aio-file>
            heroes.component.ts|html|css|spec.ts
          </aio-file>


          <aio-file>
            heroes.module.ts
          </aio-file>


          <aio-file>
            heroes-routing.module.ts
          </aio-file>


        </aio-folder>


        <aio-folder>
          shared
          <aio-file>
            shared.module.ts
          </aio-file>


          <aio-file>
            init-caps.pipe.ts|spec.ts
          </aio-file>


          <aio-file>
            text-filter.component.ts|spec.ts
          </aio-file>


          <aio-file>
            text-filter.service.ts|spec.ts
          </aio-file>


        </aio-folder>


        <aio-folder>
          villains
          <aio-folder>
            villain
            <aio-file>
              ...
            </aio-file>


          </aio-folder>


          <aio-folder>
            villain-list
            <aio-file>
              ...
            </aio-file>


          </aio-folder>


          <aio-folder>
            shared
            <aio-file>
              ...
            </aio-file>


          </aio-folder>


          <aio-file>
            villains.component.ts|html|css|spec.ts
          </aio-file>


          <aio-file>
            villains.module.ts
          </aio-file>


          <aio-file>
            villains-routing.module.ts
          </aio-file>


        </aio-folder>


        <aio-file>
          app.component.ts|html|css|spec.ts
        </aio-file>


        <aio-file>
          app.module.ts
        </aio-file>


        <aio-file>
          app-routing.module.ts
        </aio-file>


      </aio-folder>


      <aio-file>
        main.ts
      </aio-file>


      <aio-file>
        index.html
      </aio-file>


      <aio-file>
        ...
      </aio-file>


    </aio-folder>


    <aio-file>
      node_modules/...
    </aio-file>


    <aio-file>
      ...
    </aio-file>


  </aio-folder>


</aio-filetree>


While components in dedicated folders are widely preferred, 
another option for small apps is to keep components flat (not in a dedicated folder). 
This adds up to four files to the existing folder, but also reduces the folder nesting. 
Whatever you choose, be consistent.
<a href="#toc">Back to top</a>
### <a id="04-07"></a>_Folders-by-feature_ structure
#### <a href="#04-07">Style 04-07</a>


~~~ {.s-rule.do}

**Do** create folders named for the feature area they represent.


~~~


<div class='s-why'>
  **Why?** A developer can locate the code, identify what each file represents   
    at a glance, the structure is as flat as it can be, and there are no repetitive or redundant names.  
    
</div>


<div class='s-why'>
  **Why?** The LIFT guidelines are all covered.  
    
</div>


<div class='s-why'>
  **Why?** Helps reduce the app from becoming cluttered through organizing the content and keeping them aligned with the LIFT guidelines.  
    
</div>


<div class='s-why'>
  **Why?** When there are a lot of files (e.g. 10+), locating them is easier with a consistent folder structure and more difficult in a flat structure.  
    
</div>



~~~ {.s-rule.do}

**Do** create an Angular module for each feature area.


~~~


<div class='s-why'>
  **Why?** Angular modules make it easy to lazy load routable features.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Angular modules make it easier to isolate, test, and re-use features.  
    
</div>


<div class='file-tree-reference'>
  <a href="#file-tree">  Refer to this _folder and file structure_ example.  </a>
</div>

<a href="#toc">Back to top</a>
### <a id="04-08"></a>App _root module_
#### <a href="#04-08">Style 04-08</a>


~~~ {.s-rule.do}

**Do** create an Angular module in the app's root folder (e.g., in `/src/app`).


~~~


<div class='s-why'>
  **Why?** Every app requires at least one root Angular module.  
    
</div>



~~~ {.s-rule.consider}

**Consider** naming the root module `app.module.ts`.


~~~


<div class='s-why' class='s-why-last'>
  **Why?** Makes it easier to locate and identify the root module.  
    
</div>



{@example 'style-guide/ts/src/04-08/app/app.module.ts' region='example'}

<a href="#toc">Back to top</a>
### <a id="04-09"></a>Feature modules
#### <a href="#04-09">Style 04-09</a>

~~~ {.s-rule.do}

**Do** create an Angular module for all distinct features in an application (e.g. `Heroes` feature).


~~~



~~~ {.s-rule.do}

**Do** place the feature module in the same named folder as the feature area (.e.g `app/heroes`).


~~~



~~~ {.s-rule.do}

**Do** name the feature module file reflecting the name of the feature area and folder (e.g. `app/heroes/heroes.module.ts`)


~~~



~~~ {.s-rule.do}

**Do** name the feature module symbol reflecting the name of the feature area, folder, and file (e.g. `app/heroes/heroes.module.ts` defines `HeroesModule`)


~~~


<div class='s-why'>
  **Why?** A feature module can expose or hide its implementation from other modules.  
    
</div>


<div class='s-why'>
  **Why?** A feature module identifies distinct sets of related components that comprise the feature area.   
    
</div>


<div class='s-why'>
  **Why?** A feature module can easily be routed to both eagerly and lazily.   
    
</div>


<div class='s-why'>
  **Why?** A feature module defines clear boundaries between specific functionality and other application features.   
    
</div>


<div class='s-why'>
  **Why?** A feature module helps clarify and make it easier to assign development responsibilities to different teams.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** A feature module can easily be isolated for testing.  
    
</div>

<a href="#toc">Back to top</a>
### <a id="04-10"></a>Shared feature module
#### <a href="#04-10">Style 04-10</a>


~~~ {.s-rule.do}

**Do** create a feature module named `SharedModule` in a `shared` folder (e.g. `app/shared/shared.module.ts` defines `SharedModule`).


~~~



~~~ {.s-rule.do}

**Do** declare components, directives, and pipes in a shared module when those 
items will be re-used and referenced by the components declared in other feature modules.


~~~



~~~ {.s-rule.consider}

**Consider** using the name SharedModule, when the contents of a shared 
module are referenced across the entire application.


~~~



~~~ {.s-rule.do}

**Do** not provide services in shared modules. Services are usually 
singletons that are provided once for the entire application or 
in a particular feature module.


~~~



~~~ {.s-rule.do}

**Do** import all modules required by the assets in the `SharedModule` (e.g. `CommonModule` and `FormsModule`).


~~~


<div class='s-why'>
  **Why?** `SharedModule` will contain components, directives and pipes that may need features from another common module (e.g. `ngFor` in `CommonModule`).  
    
</div>



~~~ {.s-rule.do}

**Do** declare all components, directives, and pipes in the `SharedModule`.


~~~



~~~ {.s-rule.do}

**Do** export all symbols from the `SharedModule` that other feature modules need to use.  


~~~


<div class='s-why'>
  **Why?** `SharedModule` exists to make commonly used components, directives and pipes available for use in the templates of components in many other modules.  
    
</div>



~~~ {.s-rule.avoid}

**Avoid** specifying app-wide singleton providers in a `SharedModule`. Intentional singletons are OK. Take care.


~~~


<div class='s-why'>
  **Why?** A lazy loaded feature module that imports that shared module will make its own copy of the service and likely have undesireable results.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** You don't want each module to have its own separate instance of singleton services.   
    Yet there is a real danger of that happening if the `SharedModule` provides a service.  
    
</div>


<aio-filetree>

  <aio-folder>
    src
    <aio-folder>
      app
      <aio-folder>
        shared
        <aio-file>
          shared.module.ts
        </aio-file>


        <aio-file>
          init-caps.pipe.ts|spec.ts
        </aio-file>


        <aio-file>
          text-filter.component.ts|spec.ts
        </aio-file>


        <aio-file>
          text-filter.service.ts|spec.ts
        </aio-file>


      </aio-folder>


      <aio-file>
        app.component.ts|html|css|spec.ts
      </aio-file>


      <aio-file>
        app.module.ts
      </aio-file>


      <aio-file>
        app-routing.module.ts
      </aio-file>


    </aio-folder>


    <aio-file>
      main.ts
    </aio-file>


    <aio-file>
      index.html
    </aio-file>


  </aio-folder>


  <aio-file>
    ...
  </aio-file>


</aio-filetree>


<md-tab-group>

  <md-tab label="app/shared/shared.module.ts">
    {@example 'style-guide/ts/src/04-10/app/shared/shared.module.ts'}
  </md-tab>


  <md-tab label="app/shared/init-caps.pipe.ts">
    {@example 'style-guide/ts/src/04-10/app/shared/init-caps.pipe.ts'}
  </md-tab>


  <md-tab label="app/shared/filter-text/filter-text.component.ts">
    {@example 'style-guide/ts/src/04-10/app/shared/filter-text/filter-text.component.ts'}
  </md-tab>


  <md-tab label="app/shared/filter-text/filter-text.service.ts">
    {@example 'style-guide/ts/src/04-10/app/shared/filter-text/filter-text.service.ts'}
  </md-tab>


  <md-tab label="app/heroes/heroes.component.ts">
    {@example 'style-guide/ts/src/04-10/app/heroes/heroes.component.ts'}
  </md-tab>


  <md-tab label="app/heroes/heroes.component.html">
    {@example 'style-guide/ts/src/04-10/app/heroes/heroes.component.html'}
  </md-tab>


</md-tab-group>

<a href="#toc">Back to top</a>
### <a id="04-11"></a>Core feature module
#### <a href="#04-11">Style 04-11</a>


~~~ {.s-rule.consider}

**Consider** collecting numerous, auxiliary, single-use classes inside a core module
to simplify the apparent structure of a feature module.


~~~



~~~ {.s-rule.consider}

**Consider** calling the application-wide core module, `CoreModule`.
Importing `CoreModule` into the root `AppModule` reduces its complexity 
and emphasizes its role as orchestrator of the application as a whole.


~~~



~~~ {.s-rule.do}

**Do** create a feature module named `CoreModule` in a `core` folder (e.g. `app/core/core.module.ts` defines `CoreModule`).


~~~



~~~ {.s-rule.do}

**Do** put a singleton service whose instance wil be shared throughout the application in the `CoreModule` (e.g. `ExceptionService` and `LoggerService`).


~~~



~~~ {.s-rule.do}

**Do** import all modules required by the assets in the `CoreModule` (e.g. `CommonModule` and `FormsModule`).


~~~


<div class='s-why'>
  **Why?** `CoreModule` provides one or more singleton services. Angular registers the providers with the app root injector, making a singleton instance of each service available to any component that needs them, whether that component is eagerly or lazily loaded.  
    
</div>


<div class='s-why'>
  **Why?** `CoreModule` will contain singleton services. When a lazy loaded module imports these, it will get a new instance and not the intended app-wide singleton.  
    
</div>



~~~ {.s-rule.do}

**Do** gather application-wide, single use components in the `CoreModule`.
Import it once (in the `AppModule`) when the app starts and never import it anywhere else. (e.g. `NavComponent` and `SpinnerComponent`).


~~~


<div class='s-why'>
  **Why?** Real world apps can have several single-use components (e.g., spinners, message toasts, and modal dialogs) that appear only in the `AppComponent` template.   
    They are not imported elsewhere so they're not shared in that sense.   
    Yet they're too big and messy to leave loose in the root folder.  
    
</div>



~~~ {.s-rule.avoid}

**Avoid** importing the `CoreModule` anywhere except in the `AppModule`.


~~~


<div class='s-why'>
  **Why?** A lazily loaded feature module that directly imports the `CoreModule` will make its own copy of services and likely have undesireable results.  
    
</div>


<div class='s-why'>
  **Why?** An eagerly loaded feature module already has access to the `AppModule`'s injector, and thus the `CoreModule`'s services.   
    
</div>



~~~ {.s-rule.do}

**Do** export all symbols from the `CoreModule` that the `AppModule` will import and make available for other feature modules to use.  


~~~


<div class='s-why'>
  **Why?** `CoreModule` exists to make commonly used singleton services available for use in the many other modules.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** You want the entire app to use the one, singleton instance.  
    You don't want each module to have its own separate instance of singleton services.   
    Yet there is a real danger of that happening accidentally if the `CoreModule` provides a service.  
      
    
</div>


<aio-filetree>

  <aio-folder>
    src
    <aio-folder>
      app
      <aio-folder>
        core
        <aio-file>
          core.module.ts
        </aio-file>


        <aio-file>
          logger.service.ts|spec.ts
        </aio-file>


        <aio-folder>
          nav
          <aio-file>
            nav.component.ts|html|css|spec.ts
          </aio-file>


        </aio-folder>


        <aio-folder>
          spinner
          <aio-file>
            spinner.component.ts|html|css|spec.ts
          </aio-file>


          <aio-file>
            spinner.service.ts|spec.ts
          </aio-file>


        </aio-folder>


      </aio-folder>


      <aio-file>
        app.component.ts|html|css|spec.ts
      </aio-file>


      <aio-file>
        app.module.ts
      </aio-file>


      <aio-file>
        app-routing.module.ts
      </aio-file>


    </aio-folder>


    <aio-file>
      main.ts
    </aio-file>


    <aio-file>
      index.html
    </aio-file>


  </aio-folder>


  <aio-file>
    ...
  </aio-file>


</aio-filetree>


<md-tab-group>

  <md-tab label="app/app.module.ts">
    {@example 'style-guide/ts/src/04-11/app/app.module.ts' region='example'}
  </md-tab>


  <md-tab label="app/core/core.module.ts">
    {@example 'style-guide/ts/src/04-11/app/core/core.module.ts'}
  </md-tab>


  <md-tab label="app/core/logger.service.ts">
    {@example 'style-guide/ts/src/04-11/app/core/logger.service.ts'}
  </md-tab>


  <md-tab label="app/core/nav/nav.component.ts">
    {@example 'style-guide/ts/src/04-11/app/core/nav/nav.component.ts'}
  </md-tab>


  <md-tab label="app/core/nav/nav.component.html">
    {@example 'style-guide/ts/src/04-11/app/core/nav/nav.component.html'}
  </md-tab>


  <md-tab label="app/core/spinner/spinner.component.ts">
    {@example 'style-guide/ts/src/04-11/app/core/spinner/spinner.component.ts'}
  </md-tab>


  <md-tab label="app/core/spinner/spinner.component.html">
    {@example 'style-guide/ts/src/04-11/app/core/spinner/spinner.component.html'}
  </md-tab>


  <md-tab label="app/core/spinner/spinner.service.ts">
    {@example 'style-guide/ts/src/04-11/app/core/spinner/spinner.service.ts'}
  </md-tab>


</md-tab-group>


`AppModule` is a little smaller because many app/root classes have moved to other modules. 
`AppModule` is stable because you will add future components and providers to other modules, not this one. 
`AppModule` delegates to imported modules rather than doing work. 
`AppModule` is focused on its main task, orchestrating the app as a whole.
<a href="#toc">Back to top</a>
### <a id="04-12"></a>Prevent re-import of the core module
#### <a href="#04-12">Style 04-12</a>
Only the root `AppModule` should import the `CoreModule`. 


~~~ {.s-rule.do}

**Do** guard against reimporting of `CoreModule` and fail fast by adding guard logic.


~~~


<div class='s-why' class='s-why'>
  **Why?** Guards against reimporting of the `CoreModule`.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Guards against creating multiple instances of assets intended to be singletons.  
    
</div>


<md-tab-group>

  <md-tab label="app/core/module-import-guard.ts">
    {@example 'style-guide/ts/src/04-12/app/core/module-import-guard.ts'}
  </md-tab>


  <md-tab label="app/core/core.module.ts">
    {@example 'style-guide/ts/src/04-12/app/core/core.module.ts'}
  </md-tab>


</md-tab-group>

<a href="#toc">Back to top</a>
### <a id="04-13"></a>Lazy Loaded folders
#### <a href="#04-13">Style 04-13</a>
A distinct application feature or workflow may be *lazy loaded* or *loaded on demand* rather than when the application starts.


~~~ {.s-rule.do}

**Do** put the contents of lazy loaded features in a *lazy loaded folder*.
A typical *lazy loaded folder* contains a *routing component*, its child components, and their related assets and modules.


~~~


<div class='s-why' class='s-why-last'>
  **Why?** The folder makes it easy to identify and isolate the feature content.  
    
</div>

<a href="#toc">Back to top</a>
### <a id="04-14"></a>Never directly import lazy loaded folders
#### <a href="#04-14">Style 04-14</a>


~~~ {.s-rule.avoid}

**Avoid** allowing modules in sibling and parent folders to directly import a module in a *lazy loaded feature*.


~~~


<div class='s-why' class='s-why-last'>
  **Why?** Directly importing and using a module will load it immediately when the intention is to load it on demand.  
    
</div>

<a href="#toc">Back to top</a>
## Components

### <a id="05-02"></a>Component selector names
#### <a href="#05-02">Style 05-02</a>


~~~ {.s-rule.do}

**Do** use _dashed-case_ or _kebab-case_ for naming the element selectors of components.


~~~


<div class='s-why' class='s-why-last'>
  **Why?** Keeps the element names consistent with the specification for [Custom Elements](https://www.w3.org/TR/custom-elements/).  
    
</div>



{@example 'style-guide/ts/src/05-02/app/heroes/shared/hero-button/hero-button.component.avoid.ts' region='example'}


<md-tab-group>

  <md-tab label="app/heroes/shared/hero-button/hero-button.component.ts">
    {@example 'style-guide/ts/src/05-02/app/heroes/shared/hero-button/hero-button.component.ts' region='example'}
  </md-tab>


  <md-tab label="app/app.component.html">
    {@example 'style-guide/ts/src/05-02/app/app.component.html'}
  </md-tab>


</md-tab-group>

<a href="#toc">Back to top</a>
### <a id="05-03"></a>Components as elements
#### <a href="#05-03">Style 05-03</a>


~~~ {.s-rule.do}

**Do** give components an _element_ selector, as opposed to _attribute_ or _class_ selectors.


~~~


<div class='s-why'>
  **Why?** components have templates containing HTML and optional Angular template syntax.  
    They display content.   
    Developers place components on the page as they would native HTML elements and WebComponents.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** It is easier to recognize that a symbol is a component by looking at the template's html.  
    
</div>



{@example 'style-guide/ts/src/05-03/app/heroes/shared/hero-button/hero-button.component.avoid.ts' region='example'}



{@example 'style-guide/ts/src/05-03/app/app.component.avoid.html'}


<md-tab-group>

  <md-tab label="app/heroes/shared/hero-button/hero-button.component.ts">
    {@example 'style-guide/ts/src/05-03/app/heroes/shared/hero-button/hero-button.component.ts' region='example'}
  </md-tab>


  <md-tab label="app/app.component.html">
    {@example 'style-guide/ts/src/05-03/app/app.component.html'}
  </md-tab>


</md-tab-group>

<a href="#toc">Back to top</a>
### <a id="05-04"></a>Extract templates and styles to their own files
#### <a href="#05-04">Style 05-04</a>


~~~ {.s-rule.do}

**Do** extract templates and styles into a separate file, when more than 3 lines.


~~~



~~~ {.s-rule.do}

**Do** name the template file `[component-name].component.html`, where [component-name] is the component name.


~~~



~~~ {.s-rule.do}

**Do** name the style file `[component-name].component.css`, where [component-name] is the component name.


~~~



~~~ {.s-rule.do}

**Do** specify _component-relative_ URLs, prefixed with `./`, and add `moduleId: module.id` to the component metadata.


~~~


<div class='s-why'>
  **Why?** Large, inline templates and styles obscure the component's purpose and implementation, reducing readability and maintainability.  
    
</div>


<div class='s-why'>
  **Why?** In most editors, syntax hints and code snippets aren't available when developing inline templates and styles.  
    The Angular TypeScript Language Service (forthcoming) promises to overcome this deficiency for HTML templates  
    in those editors that support it; it won't help with CSS styles.  
    
</div>


<div class='s-why'>
  **Why?** A _component relative_ URL requires no change when you move the component files, as long as the files stay together.  
    
</div>


<div class='s-why'>
  **Why?** The JIT compiler requires the `moduleId` for relative URLs; the AOT compiler,   
    which doesn't need it, safely ignores this property.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** The `./` prefix is standard syntax for relative URLs; don't depend on Angular's current ability to do without that prefix.  
      
    
</div>



{@example 'style-guide/ts/src/05-04/app/heroes/heroes.component.avoid.ts' region='example'}


<md-tab-group>

  <md-tab label="app/heroes/heroes.component.ts">
    {@example 'style-guide/ts/src/05-04/app/heroes/heroes.component.ts' region='example'}
  </md-tab>


  <md-tab label="app/heroes/heroes.component.html">
    {@example 'style-guide/ts/src/05-04/app/heroes/heroes.component.html'}
  </md-tab>


  <md-tab label="app/heroes/heroes.component.css">
    {@example 'style-guide/ts/src/05-04/app/heroes/heroes.component.css'}
  </md-tab>


</md-tab-group>

<a href="#toc">Back to top</a>
### <a id="05-12"></a>Decorate _input_ and _output_ properties
#### <a href="#05-12">Style 05-12</a>


~~~ {.s-rule.do}

**Do** use the `@Input` and `@Output` class decorators instead of the `inputs` and `outputs` properties of the 
`@Directive` and `@Component` metadata:


~~~



~~~ {.s-rule.do}

**Consider** placing `@Input()` or `@Output()` on the same line as the property it decorates.


~~~


<div class='s-why'>
  **Why?** It is easier and more readable to identify which properties in a class are inputs or outputs.  
    
</div>


<div class='s-why'>
  **Why?** If you ever need to rename the property or event name associated with   
    `@Input` or `@Output`, you can modify it in a single place.  
    
</div>


<div class='s-why'>
  **Why?** The metadata declaration attached to the directive is shorter and thus more readable.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Placing the decorator on the same line _usually_ makes for shorter code and still easily identifies the property as an input or output.  
    Put it on the line above when doing so is clearly more readable.  
    
</div>



{@example 'style-guide/ts/src/05-12/app/heroes/shared/hero-button/hero-button.component.avoid.ts' region='example'}



{@example 'style-guide/ts/src/05-12/app/heroes/shared/hero-button/hero-button.component.ts' region='example'}

<a href="#toc">Back to top</a>
### <a id="05-13"></a>Avoid aliasing _inputs_ and _outputs_
#### <a href="#05-13">Style 05-13</a>


~~~ {.s-rule.avoid}

**Avoid** _input_ and _output_ aliases except when it serves an important purpose.


~~~


<div class='s-why'>
  **Why?** Two names for the same property (one private, one public) is inherently confusing.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** You should use an alias when the directive name is also an _input_ property,   
    and the directive name doesn't describe the property.  
    
</div>



{@example 'style-guide/ts/src/05-13/app/heroes/shared/hero-button/hero-button.component.avoid.ts' region='example'}



{@example 'style-guide/ts/src/05-13/app/app.component.avoid.html'}


<md-tab-group>

  <md-tab label="app/heroes/shared/hero-button/hero-button.component.ts">
    {@example 'style-guide/ts/src/05-13/app/heroes/shared/hero-button/hero-button.component.ts' region='example'}
  </md-tab>


  <md-tab label="app/heroes/shared/hero-button/hero-highlight.directive.ts">
    {@example 'style-guide/ts/src/05-13/app/heroes/shared/hero-highlight.directive.ts'}
  </md-tab>


  <md-tab label="app/app.component.html">
    {@example 'style-guide/ts/src/05-13/app/app.component.html'}
  </md-tab>


</md-tab-group>

<a href="#toc">Back to top</a>
### <a id="05-14"></a>Member sequence
#### <a href="#05-14">Style 05-14</a>


~~~ {.s-rule.do}

**Do** place properties up top followed by methods.


~~~



~~~ {.s-rule.do}

**Do** place private members after public members, alphabetized.


~~~


<div class='s-why' class='s-why-last'>
  **Why?** Placing members in a consistent sequence makes it easy to read and   
    helps instantly identify which members of the component serve which purpose.  
    
</div>



{@example 'style-guide/ts/src/05-14/app/shared/toast/toast.component.avoid.ts' region='example'}



{@example 'style-guide/ts/src/05-14/app/shared/toast/toast.component.ts' region='example'}

<a href="#toc">Back to top</a>
### <a id="05-15"></a>Delegate complex component logic to services
#### <a href="#05-15">Style 05-15</a>


~~~ {.s-rule.do}

**Do** limit logic in a component to only that required for the view. All other logic should be delegated to services.


~~~



~~~ {.s-rule.do}

**Do** move reusable logic to services and keep components simple and focused on their intended purpose.


~~~


<div class='s-why'>
  **Why?** Logic may be reused by multiple components when placed within a service and exposed via a function.  
    
</div>


<div class='s-why'>
  **Why?** Logic in a service can more easily be isolated in a unit test, while the calling logic in the component can be easily mocked.  
    
</div>


<div class='s-why'>
  **Why?** Removes dependencies and hides implementation details from the component.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Keeps the component slim, trim, and focused.  
    
</div>



{@example 'style-guide/ts/src/05-15/app/heroes/hero-list/hero-list.component.avoid.ts'}



{@example 'style-guide/ts/src/05-15/app/heroes/hero-list/hero-list.component.ts' region='example'}

<a href="#toc">Back to top</a>
### <a id="05-16"></a>Don't prefix _output_ properties
#### <a href="#05-16">Style 05-16</a>


~~~ {.s-rule.do}

**Do** name events without the prefix `on`.


~~~



~~~ {.s-rule.do}

**Do** name event handler methods with the prefix `on` followed by the event name.


~~~


<div class='s-why'>
  **Why?** This is consistent with built-in events such as button clicks.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Angular allows for an [alternative syntax](guide/template-syntax) `on-*`. If the event itself was prefixed with `on` this would result in an `on-onEvent` binding expression.  
    
</div>



{@example 'style-guide/ts/src/05-16/app/heroes/hero.component.avoid.ts' region='example'}



{@example 'style-guide/ts/src/05-16/app/app.component.avoid.html'}


<md-tab-group>

  <md-tab label="app/heroes/hero.component.ts">
    {@example 'style-guide/ts/src/05-16/app/heroes/hero.component.ts' region='example'}
  </md-tab>


  <md-tab label="app/app.component.html">
    {@example 'style-guide/ts/src/05-16/app/app.component.html'}
  </md-tab>


</md-tab-group>

<a href="#toc">Back to top</a>
### <a id="05-17"></a>Put presentation logic in the component class
#### <a href="#05-17">Style 05-17</a>


~~~ {.s-rule.do}

**Do** put presentation logic in the component class, and not in the template.


~~~


<div class='s-why'>
  **Why?** Logic will be contained in one place (the component class) instead of being spread in two places.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Keeping the component's presentation logic in the class instead of the template improves testability, maintainability, and reusability.  
    
</div>



{@example 'style-guide/ts/src/05-17/app/heroes/hero-list/hero-list.component.avoid.ts' region='example'}



{@example 'style-guide/ts/src/05-17/app/heroes/hero-list/hero-list.component.ts' region='example'}

<a href="#toc">Back to top</a>
## Directives
<a href="#toc">Back to top</a>
### <a id="06-01"></a>Use directives to enhance an element
#### <a href="#06-01">Style 06-01</a>


~~~ {.s-rule.do}

**Do** use attribute directives when you have presentation logic without a template.


~~~


<div class='s-why'>
  **Why?** Attributes directives don't have an associated template.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** An element may have more than one attribute directive applied.  
    
</div>



{@example 'style-guide/ts/src/06-01/app/shared/highlight.directive.ts' region='example'}



{@example 'style-guide/ts/src/06-01/app/app.component.html'}

<a href="#toc">Back to top</a>
### <a id="06-03"></a>_HostListener_/_HostBinding_ decorators versus _host_ metadata
#### <a href="#06-03">Style 06-03</a>


~~~ {.s-rule.consider}

**Consider** preferring the `@HostListener` and `@HostBinding` to the 
`host` property of the `@Directive` and `@Component` decorators.


~~~



~~~ {.s-rule.do}

**Do** be consistent in your choice.


~~~


<div class='s-why' class='s-why-last'>
  **Why?** The property associated with `@HostBinding` or the method associated with `@HostListener`   
    can be modified only in a single place - in the directive's class.   
    If you use the `host` metadata property, you must modify both the property declaration inside the controller,   
    and the metadata associated with the directive.  
    
</div>



{@example 'style-guide/ts/src/06-03/app/shared/validator.directive.ts'}

Compare with the less preferred `host` metadata alternative.

<div class='s-why' class='s-why-last'>
  **Why?** The `host` metadata is only one term to remember and doesn't require extra ES imports.  
    
</div>



{@example 'style-guide/ts/src/06-03/app/shared/validator2.directive.ts'}

<a href="#toc">Back to top</a>
## Services

### <a id="07-01"></a>Services are singletons
#### <a href="#07-01">Style 07-01</a>


~~~ {.s-rule.do}

**Do** use services as singletons within the same injector. Use them for sharing data and functionality.


~~~


<div class='s-why'>
  **Why?** Services are ideal for sharing methods across a feature area or an app.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** Services are ideal for sharing stateful in-memory data.  
    
</div>



{@example 'style-guide/ts/src/07-01/app/heroes/shared/hero.service.ts' region='example'}

<a href="#toc">Back to top</a>
### <a id="07-02"></a>Single responsibility
#### <a href="#07-02">Style 07-02</a>


~~~ {.s-rule.do}

**Do** create services with a single responsibility that is encapsulated by its context.


~~~



~~~ {.s-rule.do}

**Do** create a new service once the service begins to exceed that singular purpose.


~~~


<div class='s-why'>
  **Why?** When a service has multiple responsibilities, it becomes difficult to test.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** When a service has multiple responsibilities, every component or service that injects it now carries the weight of them all.  
    
</div>

<a href="#toc">Back to top</a>
### <a id="07-03"></a>Providing a service
#### <a href="#07-03">Style 07-03</a>


~~~ {.s-rule.do}

**Do** provide services to the Angular injector at the top-most component where they will be shared.


~~~


<div class='s-why'>
  **Why?** The Angular injector is hierarchical.  
    
</div>


<div class='s-why'>
  **Why?** When providing the service to a top level component,   
    that instance is shared and available to all child components of that top level component.  
    
</div>


<div class='s-why'>
  **Why?** This is ideal when a service is sharing methods or state.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** This is not ideal when two different components need different instances of a service. In this scenario it would be better to provide the service at the component level that needs the new and separate instance.  
    
</div>


<md-tab-group>

  <md-tab label="app/app.component.ts">
    {@example 'style-guide/ts/src/07-03/app/app.component.ts'}
  </md-tab>


  <md-tab label="app/heroes/hero-list/hero-list.component.ts">
    {@example 'style-guide/ts/src/07-03/app/heroes/hero-list/hero-list.component.ts'}
  </md-tab>


</md-tab-group>

<a href="#toc">Back to top</a>
### <a id="07-04"></a>Use the @Injectable() class decorator
#### <a href="#07-04">Style 07-04</a>


~~~ {.s-rule.do}

**Do** use the `@Injectable` class decorator instead of the `@Inject` parameter decorator when using types as tokens for the dependencies of a service.


~~~


<div class='s-why'>
  **Why?** The Angular Dependency Injection (DI) mechanism resolves a service's own   
    dependencies based on the declared types of that service's constructor parameters.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** When a service accepts only dependencies associated with type tokens, the `@Injectable()` syntax is much less verbose compared to using `@Inject()` on each individual constructor parameter.  
    
</div>



{@example 'style-guide/ts/src/07-04/app/heroes/shared/hero-arena.service.avoid.ts' region='example'}



{@example 'style-guide/ts/src/07-04/app/heroes/shared/hero-arena.service.ts' region='example'}

<a href="#toc">Back to top</a>
## Data Services

### <a id="08-01"></a>Talk to the server through a service
#### <a href="#08-01">Style 08-01</a>


~~~ {.s-rule.do}

**Do** refactor logic for making data operations and interacting with data to a service.


~~~



~~~ {.s-rule.do}

**Do** make data services responsible for XHR calls, local storage, stashing in memory, or any other data operations.


~~~


<div class='s-why'>
  **Why?** The component's responsibility is for the presentation and gathering of information for the view. It should not care how it gets the data, just that it knows who to ask for it. Separating the data services moves the logic on how to get it to the data service, and lets the component be simpler and more focused on the view.  
    
</div>


<div class='s-why'>
  **Why?** This makes it easier to test (mock or real) the data calls when testing a component that uses a data service.  
    
</div>


<div class='s-why' class='s-why-last'>
  **Why?** The details of data management, such as headers, HTTP methods,   
    caching, error handling, and retry logic, are irrelevant to components   
    and other data consumers.  
      
    A data service encapsulates these details. It's easier to evolve these   
    details inside the service without affecting its consumers. And it's   
    easier to test the consumers with mock service implementations.  
    
</div>

<a href="#toc">Back to top</a>
## Lifecycle hooks

Use Lifecycle hooks to tap into important events exposed by Angular.
<a href="#toc">Back to top</a>
### <a id="09-01"></a>Implement lifecycle hook interfaces
#### <a href="#09-01">Style 09-01</a>


~~~ {.s-rule.do}

**Do** implement the lifecycle hook interfaces.


~~~


<div class='s-why' class='s-why-last'>
  **Why?** Lifecycle interfaces prescribe typed method   
    signatures. use those signatures to flag spelling and syntax mistakes.  
    
</div>



{@example 'style-guide/ts/src/09-01/app/heroes/shared/hero-button/hero-button.component.avoid.ts' region='example'}



{@example 'style-guide/ts/src/09-01/app/heroes/shared/hero-button/hero-button.component.ts' region='example'}

<a href="#toc">Back to top</a>
## Appendix

Useful tools and tips for Angular.
<a href="#toc">Back to top</a>
### <a id="A-01"></a>Codelyzer
#### <a href="#A-01">Style A-01</a>


~~~ {.s-rule.do}

**Do** use [codelyzer](https://www.npmjs.com/package/codelyzer) to follow this guide.


~~~



~~~ {.s-rule.consider}

**Consider** adjusting the rules in codelyzer to suit your needs.


~~~

<a href="#toc">Back to top</a>
### <a id="A-02"></a>File templates and snippets
#### <a href="#A-02">Style A-02</a>


~~~ {.s-rule.do}

**Do** use file templates or snippets to help follow consistent styles and patterns. Here are templates and/or snippets for some of the web development editors and IDEs.


~~~



~~~ {.s-rule.consider}

**Consider** using [snippets](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2) for [Visual Studio Code](https://code.visualstudio.com/) that follow these styles and guidelines.

<a href="https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2">
  <img src="https://github.com/johnpapa/vscode-angular2-snippets/raw/master/images/use-extension.gif" width="80%" alt="Use Extension">
</a>  

**Consider** using [snippets](https://atom.io/packages/angular-2-typescript-snippets) for [Atom](https://atom.io/) that follow these styles and guidelines.

**Consider** using [snippets](https://github.com/orizens/sublime-angular2-snippets) for [Sublime Text](http://www.sublimetext.com/) that follow these styles and guidelines.

**Consider** using [snippets](https://github.com/mhartington/vim-angular2-snippets) for [Vim](http://www.vim.org/) that follow these styles and guidelines.


~~~

<a href="#toc">Back to top</a>