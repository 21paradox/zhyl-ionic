

// https://github.com/eugen/CanvasCaptcha
angular.module('zhyl.captcha', [])

.factory('captcha', function () {

    var optimer = {
        "glyphs": {
            "0": {
                "x_min": 48,
                "x_max": 699,
                "ha": 749,
                "o": "m 372 909 q 621 773 544 909 q 699 451 699 637 q 627 116 699 252 q 372 -19 556 -19 q 120 114 193 -19 q 48 444 48 247 q 120 774 48 639 q 372 909 193 909 m 187 365 q 226 137 187 238 q 373 37 266 37 q 457 62 421 37 q 519 142 494 88 q 552 271 545 196 q 559 455 559 346 q 526 736 559 622 q 371 851 493 851 q 245 783 280 851 q 198 647 210 716 q 187 444 187 577 l 187 365 "
            },
            "1": {
                "x_min": 72,
                "x_max": 472,
                "ha": 749,
                "o": "m 334 626 q 331 722 334 655 q 329 793 329 788 q 228 737 278 765 q 133 673 177 709 q 102 713 124 688 q 72 743 80 737 q 274 827 177 780 q 458 935 372 875 l 472 929 q 463 552 472 804 q 455 259 455 300 l 459 0 q 421 5 441 2 q 384 8 401 8 q 349 5 367 8 q 312 0 330 2 q 329 289 324 133 q 334 626 334 445 "
            },
            "2": {
                "x_min": 22,
                "x_max": 622,
                "ha": 749,
                "o": "m 449 648 q 410 789 449 727 q 298 851 371 851 q 173 802 219 851 q 128 676 128 753 l 118 673 q 84 740 100 712 q 47 799 69 768 q 313 911 158 911 q 507 844 426 911 q 589 667 589 777 q 527 479 589 555 q 315 258 466 404 l 169 118 l 442 118 q 531 123 485 118 q 622 136 576 129 q 617 102 619 117 q 616 68 616 87 q 617 37 616 54 q 622 0 619 20 q 438 4 562 0 q 252 8 315 8 q 142 7 195 8 q 22 0 88 6 l 22 40 q 234 238 155 158 q 380 430 312 319 q 449 648 449 541 "
            },
            "3": {
                "x_min": 75,
                "x_max": 644,
                "ha": 749,
                "o": "m 241 465 l 238 512 l 294 510 q 424 554 375 510 q 474 680 474 599 q 434 805 474 754 q 322 856 394 856 q 220 818 257 856 q 164 711 183 780 l 153 706 q 127 767 136 747 q 99 819 118 788 q 220 886 162 863 q 348 909 278 909 q 526 857 450 909 q 603 706 603 805 q 542 564 603 617 q 383 479 482 511 q 567 423 490 479 q 644 262 644 366 q 542 55 644 129 q 302 -18 441 -18 q 183 -6 240 -18 q 75 32 127 5 q 99 189 91 116 l 113 188 q 182 73 136 115 q 302 31 229 31 q 448 92 392 31 q 505 246 505 154 q 451 389 505 333 q 312 446 398 446 q 238 435 279 446 l 241 465 "
            },
            "4": {
                "x_min": 39,
                "x_max": 691.78125,
                "ha": 749,
                "o": "m 453 252 l 177 257 l 39 253 l 39 291 q 204 522 111 392 q 345 721 297 653 q 475 906 394 789 l 527 906 l 581 906 q 575 805 581 872 q 569 705 569 739 l 569 343 l 598 343 q 644 344 620 343 q 690 350 667 345 l 683 297 q 686 270 683 287 q 691 244 689 254 q 568 253 629 253 l 568 137 l 569 0 l 505 6 l 437 0 q 450 120 447 51 q 453 252 453 190 m 453 767 l 344 626 q 230 465 298 562 q 144 343 162 368 l 453 343 l 453 767 "
            },
            "5": {
                "x_min": 75,
                "x_max": 654,
                "ha": 749,
                "o": "m 116 201 q 176 77 131 120 q 303 35 221 35 q 454 98 396 35 q 512 255 512 161 q 457 407 512 346 q 313 469 403 469 q 170 417 227 469 l 150 428 l 158 526 q 158 662 158 570 q 158 801 158 754 l 147 888 l 383 879 l 412 879 q 628 887 520 879 q 624 848 626 870 q 622 818 622 826 l 626 760 l 425 761 l 227 761 q 221 631 227 717 q 216 500 216 544 q 375 536 296 536 q 572 465 491 536 q 654 279 654 394 q 550 60 654 139 q 304 -18 447 -18 q 179 -6 231 -18 q 75 34 127 4 q 101 201 87 118 l 116 201 "
            },
            "6": {
                "x_min": 64,
                "x_max": 692,
                "ha": 749,
                "o": "m 464 859 q 267 730 324 859 q 210 442 210 602 q 315 514 262 488 q 431 540 367 540 q 618 462 545 540 q 692 270 692 385 q 604 65 692 145 q 390 -15 516 -15 q 142 93 221 -15 q 64 377 64 201 q 167 745 64 581 q 462 909 270 909 q 524 905 501 909 q 579 890 547 902 l 574 827 q 521 851 547 844 q 464 859 495 859 m 554 258 q 510 409 554 347 q 380 471 466 471 q 255 409 300 471 q 210 264 210 348 q 253 105 210 172 q 384 39 297 39 q 485 73 441 39 q 540 148 529 108 q 552 206 551 187 q 554 258 554 225 "
            },
            "7": {
                "x_min": 122.609375,
                "x_max": 729.5625,
                "ha": 749,
                "o": "m 461 553 l 586 770 l 362 770 q 129 755 232 770 q 133 786 132 769 q 135 820 135 804 q 128 888 135 853 l 408 883 l 729 887 l 729 871 q 463 429 582 641 q 251 0 344 216 l 194 8 q 153 5 169 8 q 122 0 137 2 q 214 146 179 91 q 333 339 249 201 q 461 553 417 477 "
            },
            "8": {
                "x_min": 59,
                "x_max": 689,
                "ha": 749,
                "o": "m 110 696 q 187 853 110 797 q 370 909 264 909 q 558 854 480 909 q 636 694 636 800 q 589 575 636 621 q 467 510 543 529 l 467 499 q 630 413 572 475 q 689 247 689 351 q 597 51 689 120 q 374 -18 505 -18 q 149 48 239 -18 q 59 247 59 115 q 118 414 59 347 q 281 499 178 480 l 281 510 q 157 570 205 521 q 110 696 110 619 m 371 531 q 472 577 437 531 q 507 693 507 624 q 470 810 507 764 q 366 856 433 856 q 271 807 305 856 q 238 693 238 758 q 271 578 238 625 q 371 531 305 531 m 373 31 q 505 97 461 31 q 550 255 550 164 q 506 415 550 348 q 373 482 462 482 q 239 416 283 482 q 195 255 195 351 q 240 96 195 162 q 373 31 285 31 "
            },
            "9": {
                "x_min": 57,
                "x_max": 688,
                "ha": 749,
                "o": "m 261 38 q 475 166 405 38 q 546 451 546 295 q 442 378 494 403 q 325 354 389 354 q 132 428 208 354 q 57 617 57 502 q 148 828 57 748 q 372 909 240 909 q 612 801 536 909 q 688 520 688 693 q 574 143 688 305 q 252 -18 461 -18 q 186 -14 211 -18 q 127 0 161 -11 l 113 90 q 180 51 143 64 q 261 38 218 38 m 372 419 q 501 482 457 419 q 546 634 546 545 q 504 790 546 725 q 373 855 462 855 q 238 791 284 855 q 193 637 193 727 q 238 482 193 545 q 372 419 284 419 "
            }
        },
        "cssFontWeight": "12px",
        "ascender": 1267,
        "underlinePosition": -133,
        "cssFontStyle": "normal",
        "boundingBox": {
            "yMin": -373.75,
            "xMin": -71,
            "yMax": 1025.25,
            "xMax": 1306.953125
        },
        "resolution": 1000,
        "descender": -374,
        "familyName": "Optimer",
        "lineHeight": 1640,
        "underlineThickness": 20
    };

    var drawCaptcha = (function () {
        function rnd(mul) {
            return (Math.random() * 2 - 1) * 0.1 * (mul === undefined ? 1 : mul);
        };
        function drawGlyph(ctx, glyph) {
            var outline = glyph.outline;
            if (!outline) {
                outline = glyph.outline = glyph.o.split(' ').map(function (e) {
                    var i = parseInt(e);
                    return isNaN(i) ? e : i;
                });
            }
            ctx.save();
            for (var i = 0; i < outline.length;) {
                ctx.transform(1 + rnd(0.05), rnd(0.05), rnd(0.05), 1 + rnd(0.2), rnd(100), rnd(100));
                ctx.rotate(rnd(0.1));

                ctx.save();

                // keep this disabled
                /*
                //per-curve non-accumulative transform
                ctx.transform(
                1 + rnd(0.2), // scale x
                rnd(0.01), // shear x
                rnd(0.01), // shear y
                1 + rnd(0.4), // scale y
                rnd(200), //translate x
                rnd(200)); // translate y
        
                // simpler to express rotation here
                ctx.rotate(Math.PI * rnd(0.2));
                */

                var action = outline[i++];

                switch (action) {
                    case 'm':
                        ctx.moveTo(outline[i++], outline[i++]);
                        break;
                    case 'l':
                        ctx.lineTo(outline[i++], outline[i++]);
                        break;
                    case 'q':
                        var cpx = outline[i++];
                        var cpy = outline[i++];
                        ctx.quadraticCurveTo(outline[i++], outline[i++], cpx, cpy);
                        break;
                    case 'b':
                        var x = outline[i++];
                        var y = outline[i++];
                        ctx.bezierCurveTo(outline[i++], outline[i++], outline[i++], outline[i++], x, y);
                        break;
                }

                ctx.restore();
            }
            ctx.restore();
        };

        function drawWord(font, ctx, x, word) {
            ctx.translate(x, 0);
            for (var i = 0; i < word.length; i++) {
                var c = word[i];

                //large-ish per-word accumulative transform
                //ctx.transform(1 - rnd(), rnd(1), rnd(), 1 + rnd(2), rnd(1), rnd());

                ctx.beginPath();
                var glyph = font.glyphs[c];
                drawGlyph(ctx, glyph);
                // overlap the letters quite a bit
               // ctx.translate(glyph.ha * 0.9 - 45, 0);
                ctx.translate(glyph.ha,0)
                // without strokes, some edges dissapear when confronted with the extreme
                ctx.stroke();
                ctx.fill();
            }
        };

        return function _drawCaptcha(options) {
            var o = {
                context: /*Canvas context*/null,
                font: optimer,
                style: "navy",
                bgStyle: null,
                text: "captcha"
            };
            for (var k in options) {
                o[k] = options[k];
            }

            var ctx = o.context;
            ctx.save();
            ctx.clearRect(0, 0, 1000, 1000);
            if (o.bgStyle) {
                ctx.fillStyle = o.bgStyle;
                ctx.fillRect(0, 0, 1000, 1000);
            }
            ctx.fillStyle = o.style;
            ctx.scale(0.04, -0.04);
            var x = 100;
            ctx.translate(0, -1100); //这里有修改

            o.text.split(' ').forEach(function (word) {

                drawWord(o.font, ctx, x, word);
                x += 400;
            });
            ctx.restore();
        }

    })();


    return drawCaptcha;
});

