define(['./json'], function(json) {
    /*
     * This augments the toJSON method of the Date prototype since IE 8
     * doesn't understand it's own toJSON string output. We may still need
     * to figure out how to augment the Date constructor if we are recieving
     * JSON from the server and not doing it client side though.
     */
    var d = new Date(),
        j = new Date(d.toJSON());

    /*
     * We check if this is a NaN because IE 8 can't create a date using the UTC
     * string toJSON creates, this should keep it from augmenting the toJSON of
     * more capable browsers that can create dates with the UTC string.
     */
    if(isNaN(j.getFullYear())) {
      Date.prototype.toJSON = function (key) {
        return isFinite(this.valueOf()) ?
          this.toGMTString() : null;
      };
    }

    return json;
});
