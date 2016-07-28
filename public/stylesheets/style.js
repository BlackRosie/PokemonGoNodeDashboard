import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "body": {
        "font": "15px/2 nescontroller, sans-serif",
        "fontFamily": "Helvetica",
        "background": "#eee",
        "WebkitFontSmoothing": "antialiased"
    },
    "a": {
        "color": "#00B7FF"
    },
    "*": {
        "boxSizing": "border-box",
        "font": "inherit"
    },
    "button": {
        "outline": "none",
        "transition": "all 0.15s ease",
        "position": "relative",
        "display": "inline-block",
        "paddingTop": 12,
        "paddingRight": 24,
        "paddingBottom": 12,
        "paddingLeft": 24,
        "marginTop": 0.3,
        "marginRight": 0,
        "marginBottom": 1,
        "marginLeft": 0,
        "width": "100%",
        "verticalAlign": "middle",
        "color": "#fff",
        "fontSize": 16,
        "lineHeight": 20,
        "WebkitFontSmoothing": "antialiased",
        "textAlign": "center",
        "letterSpacing": 1,
        "background": "transparent",
        "border": 0,
        "borderBottom": "2px solid #3160B6",
        "cursor": "pointer"
    },
    "nespad": {
        "marginTop": 20,
        "marginRight": "auto",
        "marginBottom": 20,
        "marginLeft": "auto",
        "border": "1em solid #e2dedb",
        "borderTopWidth": 3,
        "borderRadius": 0.3,
        "backgroundColor": "#2a2a2a",
        "width": 40,
        "height": 17.5,
        "color": "#c3442d",
        "font": "15px/2 nescontroller, sans-serif",
        "WebkitUserSelect": "none",
        "MozUserSelect": "none",
        "MsUserSelect": "none",
        "userSelect": "none",
        "boxShadow": ".1em .1em 0 hsla(0, 0%, 100%, .5),     .075em .1em 0 hsla(0, 0%, 80%, 1),     .15em .2em 0 hsla(0, 0%, 78%, 1), .225em .3em 0 hsla(0, 0%, 76%, 1), .3em .4em 0 hsla(0, 0%, 74%, 1), .375em .5em 0 .1em hsla(0, 0%, 72%, 1), .425em .6em 0 .1em hsla(0, 0%, 70%, 1), .5em .7em 0 .1em hsla(0, 0%, 68%, 1), .575em .8em 0 .1em hsla(0, 0%, 66%, 1), .65em .9em 0 .1em hsla(0, 0%, 64%, 1), .725em 1em 0 .1em hsla(0, 0%, 62%, 1), .775em 1.1em 0 .08em hsla(0, 0%, 40%, 1),     .800em 1.1em 0 .13em hsla(0, 0%, 60%, 1), .875em 1.2em 0 .13em hsla(0, 0%, 58%, 1), .950em 1.3em 0 .13em hsla(0, 0%, 56%, 1), 1.025em 1.4em 0 .13em hsla(0, 0%, 54%, 1), 1.1em 1.5em 0 .13em hsla(0, 0%, 52%, 1), 1.175em 1.6em 0 .13em hsla(0, 0%, 50%, 1), 0.4em 1.1em .5em hsla(0, 0%, 20%, .1),     0.8em 1.3em .6em hsla(0, 0%, 20%, .1), 1.2em 1.6em .7em hsla(0, 0%, 20%, .1), 1.6em 1.8em .8em hsla(0, 0%, 20%, .1), 2em 2em .9em hsla(0, 0%, 20%, .1), 2.4em 2.2em 1em hsla(0, 0%, 20%, .1), 2.8em 2.4em 1.1em hsla(0, 0%, 20%, .1), 3.2em 2.6em 1.2em hsla(0, 0%, 20%, .1), 3.6em 2.8em 1.3em hsla(0, 0%, 20%, .1), 4em 3em 1.4em hsla(0, 0%, 20%, .1)"
    },
    "cord": {
        "position": "absolute",
        "top": -1,
        "width": 1.1,
        "height": 3,
        "backgroundColor": "#bbb",
        "marginLeft": 10,
        "boxShadow": "-.2em 0 .2em .49em #222 inset"
    },
    "cord:before": {
        "content": "''",
        "position": "absolute",
        "width": 1.7,
        "height": 0.7,
        "top": 2.35,
        "left": -0.4,
        "backgroundColor": "#e2dedb",
        "boxShadow": "-.05em -.1em .3em .1em #ccc inset"
    },
    "dpad-pane": {
        "display": "inline-block",
        "verticalAlign": "top",
        "marginTop": 6.5,
        "marginRight": 4.5,
        "marginBottom": 5,
        "marginLeft": 4.5,
        "width": 2.6,
        "height": 2.6,
        "position": "relative"
    },
    "dpad-pane:before": {
        "content": "",
        "backgroundColor": "#ddd",
        "width": "100%",
        "height": "280%",
        "position": "absolute",
        "top": "-94%",
        "left": 0,
        "borderRadius": 0.3
    },
    "dpad-pane:after": {
        "content": "",
        "backgroundColor": "#ddd",
        "width": "100%",
        "height": "280%",
        "position": "absolute",
        "top": "-94%",
        "left": 0,
        "borderRadius": 0.3,
        "transform": "rotate(90deg)"
    },
    "dpad-hole:before": {
        "content": "",
        "backgroundColor": "#000",
        "marginTop": "7%",
        "marginRight": "7%",
        "marginBottom": "7%",
        "marginLeft": "7%",
        "width": "86%",
        "height": "265%",
        "position": "absolute",
        "top": "-93%",
        "left": 0,
        "borderRadius": 0.2,
        "zIndex": 1
    },
    "dpad-hole:after": {
        "content": "",
        "backgroundColor": "#000",
        "marginTop": "7%",
        "marginRight": "7%",
        "marginBottom": "7%",
        "marginLeft": "7%",
        "width": "86%",
        "height": "265%",
        "position": "absolute",
        "top": "-93%",
        "left": 0,
        "borderRadius": 0.2,
        "zIndex": 1,
        "transform": "rotate(90deg)"
    },
    "dpad": {
        "position": "relative",
        "zIndex": 1,
        "top": -0.006,
        "left": -0.1
    },
    "dpad:after": {
        "content": "",
        "position": "absolute",
        "zIndex": 1,
        "width": 1.2,
        "height": 1.2,
        "marginTop": 0.4,
        "marginRight": 0.5,
        "marginBottom": 0.4,
        "marginLeft": 0.5,
        "borderRadius": 1,
        "background": "radial-gradient(76% 63%, circle closest-corner, hsla(0, 0%, 60%, 0.45), hsla(0, 0%, 10%, 1) 100%)",
        "boxShadow": "-3px -2px 4px -1px #444444 inset"
    },
    "dpadup": {
        "transform": "rotate(.4deg) scaleY(0.98)",
        "marginTop": 0.05,
        "marginLeft": 0.15
    },
    "dpadright": {
        "transform": "rotate(.5deg) scaleX(1.02)",
        "marginTop": 0.01,
        "marginLeft": 0.11
    },
    "dpaddown": {
        "transform": "rotate(-.6deg) scaleY(1.01)",
        "marginTop": 0.05,
        "marginLeft": 0.05
    },
    "dpadleft": {
        "transform": "rotate(-.8deg) scaleX(0.97)",
        "marginTop": 0.015,
        "marginLeft": 0.1
    },
    "dpad-body": {
        "left": -2.3,
        "top": -2.3,
        "position": "absolute",
        "zIndex": 1
    },
    "dpad button": {
        "position": "absolute",
        "zIndex": 2,
        "width": 2,
        "height": 2,
        "backgroundColor": "rgba(0, 0, 0, 0)",
        "border": "none",
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "dpad button:before": {
        "content": "",
        "display": "block",
        "position": "absolute",
        "marginTop": 0,
        "marginRight": 0.55,
        "marginBottom": 0,
        "marginLeft": 0.55,
        "width": 0.8,
        "height": 0.8,
        "borderWidth": 0.1,
        "borderStyle": "solid",
        "transform": "rotate(315deg)"
    },
    "dpad button:after": {
        "content": "",
        "display": "block",
        "position": "absolute",
        "marginTop": 0.5,
        "marginRight": 0.5,
        "marginBottom": 0,
        "marginLeft": 0.5,
        "width": 0.8,
        "height": 0.45,
        "borderWidth": 0.1,
        "borderStyle": "solid"
    },
    "up": {
        "top": -2.7
    },
    "up:before": {
        "borderColor": "#151515 #444 transparent transparent"
    },
    "up:after": {
        "borderColor": "transparent #444 #444 #151515"
    },
    "right": {
        "left": 2.7,
        "transform": "rotate(90deg)"
    },
    "right:before": {
        "borderColor": "#444 #444 transparent transparent"
    },
    "right:after": {
        "borderColor": "transparent #444 #151515 #151515"
    },
    "down": {
        "top": 2.7,
        "transform": "rotate(180deg)"
    },
    "down:before": {
        "borderColor": "#444 #151515 transparent transparent"
    },
    "down:after": {
        "borderColor": "transparent #151515 #151515 #444"
    },
    "left": {
        "left": -2.7,
        "transform": "rotate(270deg)"
    },
    "left:before": {
        "borderColor": "#444 #151515 transparent transparent"
    },
    "left:after": {
        "borderColor": "transparent #151515 #444 #444"
    },
    "menu-pane": {
        "display": "inline-block",
        "verticalAlign": "top",
        "width": 11.5,
        "height": "100%",
        "overflow": "-moz-hidden-unscrollable",
        "border": "0 solid rgba(100, 100, 100, .8)",
        "borderWidth": ".1em 0"
    },
    "menu-pane labels": {
        "borderRadius": 0.3,
        "height": 2,
        "backgroundColor": "#888",
        "textTransform": "uppercase",
        "paddingTop": 0,
        "paddingRight": 0.8,
        "paddingBottom": 0,
        "paddingLeft": 0.8,
        "marginTop": 5.2,
        "boxShadow": "0 -2.7em #888, 0 -5.4em #888, 0 7em #888"
    },
    "menu-pane label": {
        "lineHeight": 1.4,
        "fontSize": 1.3
    },
    "menu-pane buttons": {
        "marginTop": 0.67,
        "marginRight": 0,
        "marginBottom": 0.67,
        "marginLeft": 0,
        "width": "100%",
        "height": 3.6,
        "borderRadius": 0.3,
        "backgroundColor": "#ddd",
        "textTransform": "uppercase",
        "paddingTop": 1.3,
        "paddingRight": 1.3,
        "paddingBottom": 1.3,
        "paddingLeft": 1.3,
        "wordSpacing": 2,
        "position": "relative"
    },
    "menu-pane buttons:before": {
        "content": "",
        "position": "absolute",
        "top": 0.4,
        "right": 0.4,
        "bottom": 0.4,
        "left": 0.4,
        "border": ".3em solid transparent",
        "borderColor": "#b1b1b1 #f6f6f6 #eee #bbb",
        "boxShadow": "1em .8em .8em -1em hsla(0, 0%, 0%, 0.3) inset"
    },
    "menu-pane button": {
        "position": "relative",
        "overflow": "hidden",
        "top": -0.3,
        "left": -0.16,
        "height": 1.2,
        "width": 3.3,
        "border": 0,
        "borderRadius": 1,
        "backgroundColor": "#2a2a2a",
        "color": "#2a2a2a",
        "boxShadow": ".04em .08em 0 hsla(0, 0%, 26%, 1),     .08em .15em 0 hsla(0, 0%, 23%, 1), .12em .23em 0 hsla(0, 0%, 20%, 1), .16em .3em 0 hsla(0, 0%, 17%, 1), .16em .3em 0 .15em hsla(0, 0%, 0%, .9),     .1em .075em .5em rgba(0, 0, 0, .3),     .3em .15em .5em rgba(0, 0, 0, .3), .6em .2em .5em rgba(0, 0, 0, .3), 1.2em .4em .5em rgba(0, 0, 0, .3)"
    },
    "menu-pane button:active": {
        "top": 0,
        "left": 0,
        "boxShadow": "0 0 0 .15em hsla(0, 0%, 0%, .9),     .1em .075em .5em rgba(0, 0, 0, .3)"
    },
    "start": {
        "float": "right"
    },
    "select": {
        "float": "left"
    },
    "action-pane": {
        "display": "inline-block",
        "verticalAlign": "top",
        "borderBottom": "1px solid transparent",
        "marginTop": 2.6,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 1.1
    },
    "logo": {
        "font": "1.3em/1 pretendo",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 3.3,
        "marginLeft": 2,
        "cursor": "default"
    },
    "logo:after": {
        "content": "'\\AE'",
        "verticalAlign": "super",
        "font": "0.6rem sans-serif"
    },
    "action-pane label": {
        "display": "inline-block",
        "backgroundColor": "#ddd",
        "borderRadius": 0.4,
        "width": 4,
        "height": 4,
        "marginLeft": 0.8,
        "textAlign": "right",
        "lineHeight": 6.1,
        "position": "relative",
        "fontSize": 1.5
    },
    "action-pane button": {
        "position": "absolute",
        "top": 0.02,
        "left": 0.22,
        "width": 3.2,
        "height": 3.2,
        "background": "radial-gradient(35% 35%, circle closest-corner, #ff8957, #E0421B 100%)",
        "borderRadius": 2,
        "border": ".08em solid hsla(10, 90%, 55%, 1)",
        "boxShadow": "2em 1em 0.2em 0 hsla(10, 90%, 45%, .5) inset,     .04em .1em 0 hsla(10, 90%, 30%, 1),     .08em .2em 0 hsla(10, 90%, 26%, 1), .12em .3em 0 hsla(10, 90%, 23%, 1), .1em .24em 0 .15em hsla(0, 0%, 15%, 1),     .1em .075em .5em rgba(0, 0, 0, .3),     .3em .15em .5em rgba(0, 0, 0, .3), .6em .3em .5em rgba(0, 0, 0, .3), 1.2em .6em .5em rgba(0, 0, 0, .3)"
    },
    "action-pane button:active": {
        "top": 0.4,
        "left": 0.35,
        "boxShadow": "2em 1em 0.2em 0 hsla(10, 90%, 45%, .5) inset,     .05em .1em 0 hsla(10, 90%, 30%, 1),     0 0 0 .15em hsla(0, 0%, 15%, 1),     .1em .075em .5em rgba(0, 0, 0, .3)"
    },
    "hgroup": {
        "textAlign": "center"
    },
    "h1": {
        "fontWeight": "300",
        "color": "#636363"
    },
    "h3": {
        "fontWeight": "300",
        "color": "#4a89dc"
    },
    "form": {
        "width": 380,
        "marginTop": 4,
        "marginRight": "auto",
        "marginBottom": 4,
        "marginLeft": "auto",
        "paddingTop": 3,
        "paddingRight": 2,
        "paddingBottom": 2,
        "paddingLeft": 2,
        "background": "#fafafa",
        "border": "1px solid #ebebeb",
        "boxShadow": "rgba(0, 0, 0, 0.14902) 0px 1px 1px 0px, rgba(0, 0, 0, 0.09804) 0px 1px 2px 0px"
    },
    "group": {
        "position": "relative",
        "marginBottom": 45
    },
    "input": {
        "fontSize": 18,
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 5,
        "WebkitAppearance": "none",
        "display": "block",
        "background": "#fafafa",
        "color": "#636363",
        "width": "100%",
        "border": "none",
        "borderRadius": 0,
        "borderBottom": "1px solid #757575"
    },
    "input:focus": {
        "outline": "none"
    },
    "label": {
        "color": "#999",
        "fontSize": 18,
        "fontWeight": "normal",
        "position": "absolute",
        "pointerEvents": "none",
        "left": 0,
        "top": -10,
        "transition": "all 0.2s ease"
    },
    "button:focus": {
        "outline": 0
    },
    "buttonBlue": {
        "background": "#4a89dc",
        "textShadow": "1px 1px 0 rgba(39, 110, 204, .5)"
    },
    "buttonBlue:hover": {
        "background": "#357bd8"
    },
    "ripples": {
        "position": "absolute",
        "top": 0,
        "left": 0,
        "width": "100%",
        "height": "100%",
        "overflow": "hidden",
        "background": "transparent"
    },
    "ripplesCircle": {
        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "transform": "translate(-50%, -50%)",
        "opacity": 0,
        "width": 0,
        "height": 0,
        "borderRadius": "50%",
        "background": "rgba(255, 255, 255, 0.25)"
    },
    "ripplesis-active ripplesCircle": {
        "animation": "ripples .4s ease-in"
    },
    "footer": {
        "textAlign": "center"
    },
    "footer p": {
        "color": "#888",
        "fontSize": 13,
        "letterSpacing": 0.4
    },
    "footer a": {
        "color": "#4a89dc",
        "textDecoration": "none",
        "transition": "all .2s ease"
    },
    "footer a:hover": {
        "color": "#666",
        "textDecoration": "underline"
    },
    "footer img": {
        "width": 80,
        "transition": "all .2s ease"
    },
    "footer img:hover": {
        "opacity": 0.83
    },
    "footer img:focus": {
        "outline": "none"
    },
    "footer a:focus": {
        "outline": "none"
    }
});