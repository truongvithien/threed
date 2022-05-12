# Web Platform 2021

## Documents

*Update later*


## Change Log
**3.2.1** | 2022-03-28
- Scale:
  - Rewrite scaleRoot *(scaleRoot.2.js)* for more tidied
    ```html
        <div id="domThatNeedBeScaled" class="desktopScale mobileScale" data-desktop-origin="top left" data-mobile-origin="top right">
            //...
        </div>
    ```
    or let scaleRoot use default origin (top left)
    ```html
        <div id="domThatNeedBeScaled" class="desktopScale mobileScale">
            //...
        </div>
    ```
  - Idea: Scale full wrapper instead of each section.
  
- Naming asset-backgrounds as section's name

    ex: **bg-header.jpg, bg-info.jpg,...** instead of **bg-1.jpg, bg-2.jpg,...**
- Naming scss template to easier to debug 

    ex: scss/home-info/**_home-info.default.scss** instead of scss/home-info/**_default.scss**
- 

3.2.0 | 2022-02-14
- Scale
  - Idea: Scale each section  *(Deprecated)*
