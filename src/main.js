/**
 * This file simply ensures that the frameplayer namespace is properly declared.
 */

//  Ensure that the main object is defined
if (typeof window.frameplayer === 'undefined') {
    window.frameplayer = {};
    //  Alias
    window.FP = window.frameplayer;
}