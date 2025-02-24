# Code Highlighting Macro for Enonic XP

[![](https://repo.itemtest.no/api/badge/latest/releases/no/item/xp-highlight)](https://repo.itemtest.no/#/releases/no/item/xp-highlight)

![Icon](src/main/resources/application.svg)

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
 5. Code now can be inserted between `[highlight]` and `[/highlight]`:
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

To build the project, run the following command

```bash
enonic project build
```

You will find the jar-file at _./build/libs/item.jar_

### Deploying locally

To deploy to a local sandbox, run the following command

```bash
enonic project deploy
```

### Deploy to Maven

```bash
./gradlew publish -P com.enonic.xp.app.production=true

