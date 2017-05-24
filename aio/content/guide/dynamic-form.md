@title
Dynamic Forms

@intro
Render dynamic forms with FormGroup.

@description
We can't always justify the cost and time to build handcrafted forms, 
especially if we'll need a great number of them, they're similar to each other, and they change frequently 
to meet rapidly changing business and regulatory requirements.

It may be more economical to create the forms dynamically, based on metadata that describe the business object model.

In this cookbook we show how to use `formGroup` to dynamically render a simple form with different control types and validation.
It's a primitive start. 
It might evolve to support a much richer variety of questions, more graceful rendering, and superior user experience.
All such greatness has humble beginnings.

In our example we use a dynamic form to build an online application experience for heroes seeking employment.
The agency is constantly tinkering with the application process.
We can create the forms on the fly *without changing our application code*. 
<a id="toc"></a>## Table of contents

   [Bootstrap](guide/dynamic-form#bootstrap)

   [Question Model](guide/dynamic-form#object-model)

   [Form Component](guide/dynamic-form#form-component)

   [Questionnaire Metadata](guide/dynamic-form#questionnaire-metadata)
   
   [Dynamic Template](guide/dynamic-form#dynamic-template)
**See the <live-example name="cb-dynamic-form"></live-example>**.

<a id="bootstrap"></a>## Bootstrap

We start by creating an `NgModule` called `AppModule`.

In our example we will be using Reactive Forms. 

Reactive Forms belongs to a different `NgModule` called `ReactiveFormsModule`, so in order to access any Reactive Forms directives, we have to import `ReactiveFormsModule` from the `@angular/forms` library.    

We bootstrap our `AppModule` in main.ts.

<md-tab-group>

  <md-tab label="app.module.ts">
    {@example 'cb-dynamic-form/ts/src/app/app.module.ts'}
  </md-tab>


  <md-tab label="main.ts">
    {@example 'cb-dynamic-form/ts/src/main.ts'}
  </md-tab>


</md-tab-group>


<a id="object-model"></a>## Question Model

The next step is to define an object model that can describe all scenarios needed by the form functionality.
The hero application process involves a form with a lot of questions. 
The "question" is the most fundamental object in the model.

We have created `QuestionBase` as the most fundamental question class.


{@example 'cb-dynamic-form/ts/src/app/question-base.ts'}

From this base we derived two new classes in `TextboxQuestion` and `DropdownQuestion` that represent Textbox and Dropdown questions. 
The idea is that the form will be bound to specific question types and render the appropriate controls dynamically. 

`TextboxQuestion` supports multiple html5 types like text, email, url etc via the `type` property.


{@example 'cb-dynamic-form/ts/src/app/question-textbox.ts'}

`DropdownQuestion` presents a list of choices in a select box.


{@example 'cb-dynamic-form/ts/src/app/question-dropdown.ts'}

Next we have defined `QuestionControlService`, a simple service for transforming our questions to a `FormGroup`. 
In a nutshell, the form group consumes the metadata from the question model and allows us to specify default values and validation rules.


{@example 'cb-dynamic-form/ts/src/app/question-control.service.ts'}

<a id="form-component"></a>## Question form components
Now that we have defined the complete model we are ready to create components to represent the dynamic form.
`DynamicFormComponent` is the entry point and the main container for the form. 
<md-tab-group>

  <md-tab label="dynamic-form.component.html">
    {@example 'cb-dynamic-form/ts/src/app/dynamic-form.component.html'}
  </md-tab>


  <md-tab label="dynamic-form.component.ts">
    {@example 'cb-dynamic-form/ts/src/app/dynamic-form.component.ts'}
  </md-tab>


</md-tab-group>

It presents a list of questions, each question bound to a `<df-question>` component element.
The `<df-question>` tag matches the `DynamicFormQuestionComponent`,
the component responsible for rendering the details of each _individual_ question based on values in the data-bound question object.  

<md-tab-group>

  <md-tab label="dynamic-form-question.component.html">
    {@example 'cb-dynamic-form/ts/src/app/dynamic-form-question.component.html'}
  </md-tab>


  <md-tab label="dynamic-form-question.component.ts">
    {@example 'cb-dynamic-form/ts/src/app/dynamic-form-question.component.ts'}
  </md-tab>


</md-tab-group>

Notice this component can present any type of question in our model. 
We only have two types of questions at this point but we can imagine many more.
The `ngSwitch` determines which type of question to display.

In both components  we're relying on Angular's **formGroup** to connect the template HTML to the
underlying control objects, populated from the question model with display and validation rules.

`formControlName` and `formGroup` are directives defined in `ReactiveFormsModule`. Our templates can access these directives directly since we imported `ReactiveFormsModule` from `AppModule`.  
<a id="questionnaire-metadata"></a>## Questionnaire data`DynamicFormComponent` expects the list of questions in the form of an array bound to  `@Input() questions`.

 The set of questions we have defined for the job application is returned from the `QuestionService`. 
 In a real app we'd retrieve these questions from storage.
 
 The key point is that we control the hero job application questions entirely through the objects returned from `QuestionService`. 
 Questionnaire maintenance is a simple matter of adding, updating, and removing objects from the `questions` array.
 

{@example 'cb-dynamic-form/ts/src/app/question.service.ts'}

Finally, we display an instance of the form in the `AppComponent` shell.


{@example 'cb-dynamic-form/ts/src/app/app.component.ts'}

<a id="dynamic-template"></a>## Dynamic Template
Although in this example we're modelling a job application for heroes, there are no references to any specific hero question 
outside the objects returned by `QuestionService`. 

This is very important since it allows us to repurpose the components for any type of survey
as long as it's compatible with our *question* object model. 
The key is the dynamic data binding of metadata used to render the form 
without making any hardcoded assumptions about specific questions. 
In addition to control metadata, we are also adding validation dynamically.

The *Save* button is disabled until the form is in a valid state. 
When the form is valid, we can click *Save* and the app renders the current form values as JSON. 
This proves that any user input is bound back to the data model.
Saving and retrieving the data is an exercise for another time.
The final form looks like this:
<figure class='image-display'>
  <img src="assets/images/cookbooks/dynamic-form/dynamic-form.png" alt="Dynamic-Form">  </img>
</figure>

[Back to top](guide/dynamic-form#top)