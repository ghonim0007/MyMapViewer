define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/dom-class",
    "esri/arcgis/utils",
    "application/toolbar",
    "dojo/domReady!"
  ], function(
    declare, dom, domClass, arcgisUtils, Toolbar
  ) {
    return declare(null, {
      config: {},
      map: null,
  
      constructor: function(config) {
        this.config = config;
      },
  
      startup: function() {
        this._createWebMap();
      },
  
      _createWebMap: function() {
        arcgisUtils.createMap(this.config.webmap, "mapDiv", {
          mapOptions: {
            slider: true 
          }
        }).then(function(response) {
          this.map = response.map;
          this._mapLoaded();
          this._createUI();
        }.bind(this), function(error) {
          this._reportError(error);
        }.bind(this));
      },
  
      _mapLoaded: function() {
        domClass.remove(document.body, "app-loading");
      },
  
      _reportError: function(error) {
        domClass.remove(document.body, "app-loading");
        var node = dom.byId("loading_message");
        if (node) {
          node.innerHTML = "Error: " + error.message;
        }
      },
  
      _createUI: function() {
        var toolbar = new Toolbar(this.config);
        toolbar.startup(this.map);
      }
    });
  });