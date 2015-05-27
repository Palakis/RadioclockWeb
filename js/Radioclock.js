function Radioclock(item) {
	this.item = document.getElementById(item);
	this.ctx = this.item.getContext('2d');
	
	this.rayon = (this.item.height / 2) - (this.item.height * 0.05);
	this.centerX = this.item.height / 2;
	this.centerY = this.item.width / 2;

	this.dotPositions = [];
	for(var i = 0; i < 60; i++) {
		var x = this.rayon * Math.cos((this.d2r(360)/60)*i-this.d2r(90));
		var y = this.rayon * Math.sin((this.d2r(360)/60)*i-this.d2r(90));
		this.dotPositions.push([x, y]);
	}

	this.drawSeconds(0, "red");
	this.drawDigits(0, 0, 0, "red");
}

Radioclock.prototype.d2r = function(deg) {
	return deg * Math.PI / 180;
}

Radioclock.prototype.drawDot = function(x, y, radius, color) {
	this.ctx.beginPath();
	this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	this.ctx.fillStyle = color;
	this.ctx.fill();
}

Radioclock.prototype.drawDigit = function(x, y, w, color, digit) {
	var segmentLength = 4;
	var separation = w * 0.20;
	var cornerSeparation = w * 0.15;
	var radius = this.rayon * 0.02;

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
    if(digit & 8) {
            for(var i = 0; i < segmentLength; i++) {
                this.drawDot(
                	x + radius + cornerSeparation + separation*i, 
                	y + (radius*2) + (cornerSeparation*2) + (separation*((segmentLength*2)-1)), 
                	radius, 
                	color
                );
            }
    }
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

Radioclock.prototype.drawSeconds = function(seconds, color) {
	for(var i = 0; i < 60; i++) {
		var x = this.centerX + this.dotPositions[i][0];
		var y = this.centerY + this.dotPositions[i][1];
		this.drawDot(x, y, this.rayon * 0.03, "red");
	}
}

Radioclock.prototype.drawDigits = function(h, m, s, color) {
	var w = this.item.width / 2.5;
	var largeurDigit = w/4;
	var blinkerSpacing = w * 0.09;
	// Premier chiffre heure
	this.drawDigit(
		this.centerX - largeurDigit - largeurDigit - (largeurDigit/3), 
		this.centerY, 
		largeurDigit, 
		color, 
		'8'
	);

	// Deuxième chiffre heure
	this.drawDigit(
		this.centerX - largeurDigit, 
		this.centerY, 
		largeurDigit, 
		color,
		'8'
	);

	// Separateur
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

	// Premier chiffre minute
	this.drawDigit(
		this.centerX + largeurDigit, 
		this.centerY, 
		largeurDigit,
		color,
		'8'
	);
    
	// Deuxième chiffre minute
    this.drawDigit(
    	this.centerX + largeurDigit + largeurDigit + (largeurDigit/3), 
    	this.centerY, 
    	largeurDigit,
    	color,
    	'8'
    );

    // Premier chiffre secondes
    this.drawDigit(
    	this.centerX - (largeurDigit/1.5),
    	this.centerY + (w/1.6),
    	largeurDigit,
    	color,
    	'8'
    );

    // Deuxième chiffre secondes
    this.drawDigit(
    	this.centerX + (largeurDigit/1.5),
    	this.centerY + (w/1.6),
    	largeurDigit,
    	color,
    	'8'
    );
}

Radioclock.prototype.update = function() {

}