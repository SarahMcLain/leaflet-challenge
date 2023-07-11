# leaflet-challenge
    
This code is designed to create a leaflet map using JSON earthquake data from USGS found here: 
    http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

## Step 1

     Function createMap is used to make the leaflet map and tile layer.

## Step 2

    Function createMarkers is used to create cirlce markers at the location of each earthquake. The color is determined by the depth coordinate of the earthquake. 

## Step 3 
    
    Function getColor sets color for each range of earchquake depths.

## Step 4 

    Creates a legend function to adda a legend to the map for earthquake depth.

## Step 5 
    
    Function getData makes a call to the url using the d3 function.

## Step 6
    
    Call the getData function and use the then method to add markers and legend to the map. 
