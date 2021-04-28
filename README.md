# Code Highlighting Macro for Enonic XPs HTML Editor

[![](https://jitpack.io/v/no.item/xp-highlight.svg)](https://jitpack.io/#no.item/xp-highlight)

<img src="https://github.com/ItemConsulting/highlight/raw/master/src/main/resources/application.svg?sanitize=true" width="150">

## Usage

### Installation

 1. Install the application through the Applications-app in Enonic XP 7.x.
 2. Add the "Code Highlighting Macro"-application to your site.
 3. You can optionally configure which code highlighting style you want to use in the site config. It should be the 
    name of one of the [included css-files in highlight.js](https://github.com/highlightjs/highlight.js/tree/master/src/styles) (e.g `github.css`).

### Usage in **Content Studio**:

 1. Enter an HTML-editor in Content Studio
 2. Select **Insert Macro** on the toolbar
 3. Select **Code Highlighting**, and pick a *language*.
 4. Your code will now contain the following macro: `[highlight language="javascript"/]`
 5. Code now can be written between `[highlight]` and `[/highlight]`:
     ```html
    [highlight language="javascript"]
    <pre>
    function demo() {
      return "This is a demo";
    }
    </pre>
    [/highlight]
    ```
 6. The resulting web page will have box containing a highlighted code:
    ![Resulting code on webpage](./docs/demo.png)

## Deploying

### Building

To build he project run the following code

```bash
./gradlew build
```

### Deploy locally

Deploy locally for testing purposes:

```bash
./gradlew publishToMavenLocal
```

## Deploy to Jitpack

Go to the [Jitpack page for xp-highlight](https://jitpack.io/#no.item/xp-highlight) to deploy from Github.

