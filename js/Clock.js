function Clock(item) {
	this.item = document.getElementById(item);
	this.ctx = this.item.getContext('2d');

	this.colorOn = "red";
	this.colorOff = "#111";

	this.rayon = (this.item.height / 2) - (this.item.height * 0.07);
	this.centerX = this.item.height / 2;
	this.centerY = this.item.width / 2;

	this.dotPositions = [];
	for(var i = 0; i < 60; i++) {
		var x = this.rayon * Math.cos((this.d2r(360)/60)*i-this.d2r(90));
		var y = this.rayon * Math.sin((this.d2r(360)/60)*i-this.d2r(90));
		this.dotPositions.push([x, y]);
	}

	this.drawDigits(88, 88, 88, this.colorOff); // Wipes previous digits
	this.drawSeconds(0, this.colorOff);
	this.drawQuarters(this.colorOn);
	this.drawColon(false);
}

Clock.prototype.d2r = function(deg) {
	return deg * Math.PI / 180;
}

Clock.prototype.drawDot = function(x, y, radius, color) {
	this.ctx.beginPath();
	this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	this.ctx.fillStyle = color;
	this.ctx.fill();
	this.ctx.strokeStyle = "black";
	this.ctx.stroke();
}

Clock.prototype.drawDigit = function(x, y, w, color, digit) {
	var segmentLength = 4;
	var separation = w * 0.25;
	var cornerSeparation = w * 0.15;
	var radius = w * 0.07;

	var maxWidth = radius + (cornerSeparation * 2) + (separation*(segmentLength - 1)) + radius;
	var maxHeight = (radius * 2) + (cornerSeparation / 2) + (separation*segmentLength) + (separation*segmentLength) + radius;

	x -= maxWidth / 2;
	y -= maxHeight / 2;

	switch(digit) {
		case '0':
			digit = 0x3F;
			break;
		case '1':
			digit = 0x06;
			break;
		case '2':
			digit = 0x5B;
			break;
		case '3':
			digit = 0x4F;
			break;
		case '4':
			digit = 0x66;
			break;
		case '5':
			digit = 0x6D;
			break;
		case '6':
			digit = 0x7D;
			break;
		case '7':
			digit = 0x07;
			break;
		case '8':
			digit = 0xFF;
			break;
		case '9':
			digit = 0x6F;
			break;
	}

	// Segment haut
	if(digit & 1) {
            for(var i = 0; i < segmentLength; i++) {
                this.drawDot(
                	x + radius + cornerSeparation + separation*(i),
                	y + radius,
                	radius,
                	color
                );
            }
    }

    // Segment haut droite
    if(digit & 2) {
            for(var i = 0; i < segmentLength; i++) {
                this.drawDot(
                	x + radius + (cornerSeparation*2) + (separation*(segmentLength-1)),
                	y + radius + cornerSeparation + separation*(i),
                	radius,
                	color
                );
            }
    }

    // Segment bas droite
    if(digit & 4) {
            for(var i = 0; i < segmentLength; i++) {
                this.drawDot(
                	x + radius + (cornerSeparation*2) + (separation*(segmentLength-1)),
                	y + (radius/2) + (cornerSeparation*2) + (separation*segmentLength) + (separation*i),
                	radius,
                	color
                );
            }
    }

    // Segment bas
    if(digit & 8) {
            for(var i = 0; i < segmentLength; i++) {
                this.drawDot(
                	x + radius + cornerSeparation + separation*i,
                	y + (radius*2) + (cornerSeparation*2.4) + (separation*((segmentLength*2)-1)),
                	radius,
                	color
                );
            }
    }

    // Segment bas gauche
    if(digit & 16) {
            for(var i = 0; i < segmentLength; i++) {
                this.drawDot(
                	x + radius,
                	y + (radius/2) + (cornerSeparation*2) + (separation*segmentLength) + (separation*i),
                	radius,
                	color
                );
            }
    }

    // Segment haut gauche
    if(digit & 32) {
            for(var i = 0; i < segmentLength; i++) {
                this.drawDot(
                	x + radius,
                	y + radius + cornerSeparation + (separation*(i)),
                	radius,
                	color
                );
            }
    }

    // Segment milieu
    if(digit & 64) {
            for(var i = 0; i < segmentLength; i++) {
                this.drawDot(
                	x + radius + cornerSeparation + separation*i,
                	y + (radius/2) + cornerSeparation + (separation*(segmentLength)),
                	radius,
                	color
                );
            }
    }
}

Clock.prototype.drawSeconds = function(seconds, color) {
	for(var i = 0; i < 60; i++) {
		var x = this.centerX + this.dotPositions[i][0];
		var y = this.centerY + this.dotPositions[i][1];
		if(i <= seconds) {
			this.drawDot(x, y, this.rayon * 0.020, color);
		} else {
			this.drawDot(x, y, this.rayon * 0.020, this.colorOff);
		}
	}
}

Clock.prototype.drawQuarters = function (color) {
	var dotRadius = this.rayon * 0.020;
	var radius = this.rayon + (dotRadius*4);
	for(var i = 0; i < 12; i++) {
		var x = radius * Math.cos((this.d2r(360)/12)*i-this.d2r(90));
		var y = radius * Math.sin((this.d2r(360)/12)*i-this.d2r(90));
		this.drawDot(this.centerX + x, this.centerY + y, dotRadius, color);
	}
}

Clock.prototype.zeroPad = function(num, size) {
	var s = num + "";
	while (s.length < size) s = "0" + s;
	return s;
}

Clock.prototype.drawDigits = function(h, m, s, color) {
	var w = this.item.width / 2.5;
	var largeurDigit = w/4;
	var blinkerSpacing = w * 0.09;

	var hourString = this.zeroPad(h, 2);
	var minuteString = this.zeroPad(m, 2);
	var secondString = this.zeroPad(s, 2);

	// Premier chiffre heure
	this.drawDigit(
		this.centerX - largeurDigit - largeurDigit - (largeurDigit/2),
		this.centerY,
		largeurDigit,
		color,
		hourString[0]
	);

	// Deuxième chiffre heure
	this.drawDigit(
		this.centerX - largeurDigit,
		this.centerY,
		largeurDigit,
		color,
		hourString[1]
	);

	// Premier chiffre minute
	this.drawDigit(
		this.centerX + largeurDigit,
		this.centerY,
		largeurDigit,
		color,
		minuteString[0]
	);

	// Deuxième chiffre minute
  this.drawDigit(
  	this.centerX + largeurDigit + largeurDigit + (largeurDigit/2),
  	this.centerY,
  	largeurDigit,
  	color,
  	minuteString[1]
  );

  // Premier chiffre secondes
  this.drawDigit(
  	this.centerX - (largeurDigit/1.7),
  	this.centerY + (w/1.6),
  	largeurDigit / 1.3,
  	color,
  	secondString[0]
  );

  // Deuxième chiffre secondes
  this.drawDigit(
  	this.centerX + (largeurDigit/1.7),
  	this.centerY + (w/1.6),
  	largeurDigit / 1.3,
  	color,
  	secondString[1]
  );
}

Clock.prototype.drawColon = function(state) {
	var w = this.item.width / 2.5;
	var blinkerSpacing = w * 0.09;

	var color;
	if(state == true) {
		color = this.colorOn;
	} else {
		color = this.colorOff;
	}

	this.drawDot(
		this.centerX,
		this.centerY - blinkerSpacing,
		this.rayon * 0.02,
		color
	);
    this.drawDot(
    	this.centerX,
    	this.centerY + blinkerSpacing,
    	this.rayon * 0.02,
    	color
    );
}

Clock.prototype.update = function() {
	var date = new Date();
	this.drawDigits(88, 88, 88, this.colorOff);
	this.drawSeconds(date.getSeconds(), this.colorOn);
	this.drawColon(true);
	this.drawDigits(date.getHours(), date.getMinutes(), date.getSeconds(), this.colorOn);

	var that = this;
	setTimeout(function() {
		that.drawColon(false);
	}, 500);
}
