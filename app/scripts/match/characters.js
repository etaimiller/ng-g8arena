'use strict';

angular.module('ngG8arenaApp')

.factory('Characters', function() {

  var c = {
    allOptions: [
      { name: 'Baraka' },
      { name: 'Cyber Sub-Zero' },
      { name: 'Ermac' },
      { name: 'Jade ' },
      { name: 'Johnny Cage' },
      { name: 'Jax' },
      { name: 'Kabal' },
      { name: 'Kano' },
      { name: 'Kitana' },
      { name: 'Kung Lao' },
      { name: 'Liu kang' },
      { name: 'Mileena' },
      { name: 'Nightwolf' },
      { name: 'Noob' },
      { name: 'Quan Chi' },
      { name: 'Raiden' },
      { name: 'Reptile'},
      { name: 'Scorpion' },
      { name: 'Sektor' },
      { name: 'Shang Tsung' },
      { name: 'Sheeva' },
      { name: 'Sindel' },
      { name: 'Smoke' },
      { name: 'Sonya Blade' },
      { name: 'Stryker' },
      { name: 'Sub-Zero' }
    ]
  };

  c.formatToEnum = function(name){
    return name.toLowerCase().split(' ').join('_');
  };

  return c;

});