$(function(){
'use strict';
    var CakeConstructor = function(constructor) {
        this.constructor = constructor;
        // this.elementShape = document.getElementById('cake_shape');
        // this.itemsShape = this.elementShape.getElementsByClassName('constructor-product-shape__item');
        this.elementShape = $('#cake_shape');
        this.itemsShape = [];
        // this.elementShape.find('.constructor-product-shape__item').map(function(index, elem){
        //     this.itemsShape.push(elem);
        // });
        // this.classNamesShape = ['selected', 'behind'];
       

        this.cakeShapeBtn = $('.constructor-product-shape__btn');
        this.pathImg = 'constructor/img/';
        this.cake = $('.constructor-product-cake');
        this.filterTitle = $('.const-filter-card__header');
        this.filterShape = $('#filter_shape');
        this.filterFilling = $('#filter_filling');
        this.radioShape = $('input[name="shape"]');

        this.tier = ['one', 'two'];

        /*параметры*/
        this.typeFilling = '1'; //начинка торта
        this.typeShape = 'round'; //форма торта

        this.selectedShape = this.elementShape.find('.selected').data('shape');
        this.selectedTier = this.elementShape.find('.selected').data('tier');
        this.selectedFilling = this.filterFilling.find('input[type="radio"]:checked').data('filling');

        console.log(this.selectedFilling);
        // if (this.itemsShape.length !== 2) {
        //     alert('В списке больше 2-х ярусов!');
        //     return false;
        // } else {
        //     for (var i = 0; i < 2; i++) {
        //         this.itemsShape[i].addClass(this.classNamesShape[i]);
        //     }
        //
        // }

        this.bindEvents();

    };

    CakeConstructor.prototype = {
        prevShape: function() {
            var l = this.elementShape.find('.behind'),
                c = this.elementShape.find('.selected');
            l.removeClass('behind');
            l.addClass('selected');
            c.removeClass('selected');
            c.addClass('behind');
        },
        nextShape: function() {
            var l = this.elementShape.find('.behind'),
                c = this.elementShape.find('.selected');
            l.removeClass('behind');
            l.addClass('selected');
            c.removeClass('selected');
            c.addClass('behind');
        },

        setShapParameters: function(){

        },


        bindEvents: function(){
            var self = this;
            // self.elementShape.each()
            // self.find();

            // this.showCake(this.selectedShape, this.selectedTier);
            // this.cakeShowBtn.on('click', function(e){
            //     e.preventDefault();
            //     $(this).parents('.constructor-product-shape__item')
            // })

            this.cakeShapeBtn.on('click', function(e){
                e.preventDefault();
                self.showCake();
                self.changeFilling(self.selectedFilling, self.selectedShape);
                self.showFilterItem(self.filterFilling.find('.const-filter-card__header'));
            });


            this.filterTitle.on('click', function(e){
                e.preventDefault();
                self.showFilterItem($(this));


                if ($(this).parents('.constructor-filter__item').is('#filter_fillings')) {
                   
                }else {
                    
                }
            });

            this.filterFilling.find('.const-filter-card__header').on('click', function (e) {
                e.preventDefault();
                self.changeFilling(self.selectedFilling, self.selectedShape);
                self.showCake();

                self.showPiece();
            });

            this.filterShape.find('.const-filter-card__header').on('click', function(e){
                e.preventDefault();
                self.cake.removeClass('active');
                self.elementShape.addClass('active');
            });

            $('#filter_filling input[type="radio"]').on('change', function(){
                self.typeFilling = $(this).data('filling');
                self.changeFilling(self.selectedFilling, self.typeShape);
                self.getTier();
                self.getShape();
            });


            $('#filter_shape input[type="radio"]').on('change', function(){
                self.typeShape = $(this).data('filterShape');
                self.changeShape(self.typeShape);
                self.changeFilling(self.typeFilling, self.typeShape );

            });

            
        },




        showCake: function(){
            $('.constructor-product-shape').addClass('visited');
            this.elementShape.removeClass('active');
            this.getTier();
            this.getShape();
            this.cake.addClass('active').find('.cake-basis').attr('src', this.pathImg + 'cake-' + this.selectedShape + '-' + this.selectedTier + '.png');
            this.filterFilling.siblings().removeClass('active');;
            this.filterFilling.addClass('active visited');
        },

        showFilterItem: function(filterTitle){
            $(filterTitle).parents('.constructor-filter__item').siblings().removeClass('active');
            $(filterTitle).parents('.constructor-filter__item').addClass('active');
        },

        addActive: function(elemActive, elemSiblings, nameClass){
            $(elemActive).siblings().removeClass(nameClass);
            $(elemActive).addClass(nameClass);
        },

        getTier: function(){
            this.selectedTier = this.elementShape.find('.selected').data('tier');
            // console.log('this.selectedTier:' + this.selectedTier);
        },

        getShape: function () {
            this.selectedShape = this.elementShape.find('.selected').data('shape');
            // console.log('this.selectedShape:' + this.selectedShape);
        },


        getFilling: function () {
            this.selectedFilling = this.filterFilling.find('input[type="radio"]:checked').data('filling');
            // console.log('this.selectedFilling:' + this.selectedFilling);
        },

        changeShape: function(typeShape){

            var self = this;
            this.elementShape.find('.constructor-product-shape__item').each(function(i, elem){
               $(elem).data('shape', typeShape).attr('data-shape', typeShape);
                $(elem).find('img').attr('src', self.pathImg + 'cake-'+ self.typeShape + '-' + self.tier[i] + '.png');
                // console.log('пусть картинки N' + i + ' ' + $(elem).find('img').attr('src'));
            });
        },

        changeFilling: function(filling, shape){
            this.getFilling();
            var fillingIMG = $('<img class="cake-filling" src="' + this.pathImg + 'filling-' + filling + '-' + shape + '-' + this.selectedTier + '.png' + '" alt="">');

            $(this.cake.find('.cake-filling')).remove();
            this.cake.append(fillingIMG);
            
        },
        
        showPiece: function(){
            var piece;
            piece = $('<img class="cake-piece" src="' + this.pathImg + 'piece-default' + '-' + this.selectedShape + '-' + this.selectedTier + '.png' + '" alt="">');

            // if (this.selectedLining !== undefined){
            //     piece = $('<img class="cake-piece" src="' + this.pathImg + 'piece-' + this.selectedLining + '-' + this.selectedShape + '-' + this.selectedTier + '.png' + '" alt="">');
            //
            // }else {
            // }
            piece.addClass('active visited');
            $(this.cake.find('.cake-piece')).remove();
            this.cake.append(piece);
        }
    };

    // var carousel = new CakeShape('cake_shape', 'constructor-product-shape__item');
    var carousel = new CakeConstructor('.constructor');
    // console.log(carousel.elementShape);
    $(document).on('click', '.constructor-product-shape__item.behind', function(e){
        e.preventDefault();

        if($(this).data('tier') == 'two'){
            carousel.nextShape();
            // var dataShape = $('.constructor-product-shape__item.selected').data('shape');
            // var dataTier = $('.constructor-product-shape__item.selected').data('tier');
            // carousel.selectedShape = dataShape;
            // carousel.selectedTier = dataTier;
        }else{
            carousel.prevShape();
        }

    });

    // console.log('carousel.selectedShape ' + carousel.selectedShape);
    // console.log('carousel.selectedTier ' + carousel.selectedTier);

});
/*конец обертки*/

