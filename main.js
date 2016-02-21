"use strict";

let $ = require("http://.....jquery")
let Color = require("color")

function verify(color) {
	if( color_point.constructor === "Color" ){
		return true
	}else{
		die('Parameter should be an instance of Color.')
	}
}
class ColorPoint {
	constructor(bg_color, fg_color) {
		verify(bg_color) // verify that color_point comes from class Color
		this._bg_color = bg_color

		verify(fg_color)
		this._fg_color = fg_color
	}
	bg() { // returns the point (location)
		return this._bg_color
	}
	fg() {
		return this._fg_color
	}
	distance(other_color_point) {
		let c = other_color_point
		let power = 2
		function p(value) {
			return Math.pow(Math.abs(value), power)
		}
		let distance = Math.pow(
			   p(c.fg().red() - this.fg().red())
			 + p(c.bg().red() - this.bg().red())
			 + p(c.fg().blue() - this.fg().blue())
			 + p(c.bg().blue() - this.bg().blue())
			 + p(c.fg().green() - this.fg().green())
			 + p(c.bg().green() - this.bg().green())
		, 1/power)
		return distance * distance_multiplier()
	}
	estimateProbability() {
		// take the AVERAGE of the point estimates from each data_point as well as one "50%" point
		let sum = 0.5 // the 50% point
		for( i in data_points ){
			sum += data_points[i].percent() / Math.pow(data_points[i].color().distance(this), 2) // The "percent" is either 1 (100%) or 0 (0%).
		}
		return sum / (data_points.length + 1)
	}
}

function distance_multiplier() {
	// the idea of the distance multiplier is to INCREASE as our data set becomes more dense.  That way we weight closer points more heavily and farther points weakly
	// but be careful, do we need to do something else to compensate?
	return 1
	return 1 + data_points.length / 200
}


class DataPoint {
	constructor(bg_color, fg_color, sign) {
		this._color_point = new ColorPoint(bg_color, fg_color)

		if( sign === 1 ){
			this._sign = 1
		}else if( sign === -1 || sign === 0 ){
			this._sign = -1
		}else{
			die('Bad sign input.  Should be 1 (for true), or -1 or 0 for false.')
		}
	}
	color() {
		return this._color_point
	}
	sign() { // returns 1 if the human liked the combination, or -1 if they didn't
		return this._sign
	}
	percent() { // returns 100% or 0%
		if( this.sign() === 1 ){
			return 1
		}else{
			return 0
		}
	}
}




let current_bg_color = null
let current_fg_color = null

$('#bg').keyup(function(e){ if( e.keyCode === 13 /*Enter*/ ){
	let bg_color_val = $('#bg').val()
	current_bg_color = Color(bg_color_val) // verify that the color is legal
		// if not legal, put error message and:
		current_bg_color = null // if necessary
	$('body').css('background-color', bg_color_val)
}})
$('#fg').keyup(function(e){ if( e.keyCode === 13 /*Enter*/ ){
	let fg_color_val = $('#fg').val()
	current_fg_color = Color(fg_color_val)
		current_fg_color = null
	$('body').css('color', fg_color_val)
}})
$('#yes').click(function(){
	submitDataPoint(1)
})
$('#no').click(function(){
	submitDataPoint(-1)
})

let data_points = []
function submitDataPoint(sign) {
	let data_point = new DataPoint(current_bg_color, current_fg_color, sign)
	data_points.push(data_point)
}




let predict_bg_color = null
let predict_fg_color = null
// see if we can DRY the below.  we have 4 similar functions...
$('#bg-predict').keyup(function(e){ if( e.keyCode === 13 /*Enter*/ ){
	let bg_color_val = $(this).val()
	current_bg_color = Color(bg_color_val)
		current_bg_color = null // if necessary
	$('body').css('background-color', bg_color_val)
	updatePrediction()
}})
$('#fg-predict').keyup(function(e){ if( e.keyCode === 13 /*Enter*/ ){
	let fg_color_val = $('#fg').val()
	current_fg_color = Color(fg_color_val)
		current_fg_color = null
	$('body').css('color', fg_color_val)
	updatePrediction()
}})
function updatePrediction() {
	let color_point = new ColorPoint(predict_bg_color, predict_fg_color)
	$('#predict').val(color_point.estimateProbability())
}

