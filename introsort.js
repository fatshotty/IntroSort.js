(function(){
  var introSort = function(array, compareFn, assignFn) {
    var introsort_loop = function(lo, hi, depth_limit) {
      while (hi - lo > introSort.size_threshold ) {
        if (depth_limit == 0) {
          heapsort(lo, hi);
          return;
        }
        depth_limit--;
        var p = partition(lo, hi, medianof3(lo, lo + ((hi - lo) / 2) + 1, hi - 1));
        introsort_loop(p, hi, depth_limit);
        hi = p;
      }
    };

    var partition = function(lo, hi, x) {
      var i = lo,
      j = hi;
      while (true) {
        while (smaller(array[i], x)) i++;
        j = j - 1;
        while (smaller(x, array[j])) j = j - 1;
        if (! (i < j)) return i;
        exchange(i, j);
        i++;
      }

    };

    var medianof3 = function(lo, mid, hi) {
      mid = Math.floor(mid);
      if (smaller(array[mid], array[lo])) {
        if (smaller(array[hi], array[mid])) return array[mid];
        else {
          if (smaller(array[hi], array[lo])) return array[hi];
          else return array[lo];
        }

      } else {
        if (smaller(array[hi], array[mid])) {
          if (smaller(array[hi], array[lo])) return array[lo];
          else return array[hi];

        } else return array[mid];
      }

    };

    var heapsort = function(lo, hi) {
      var n = hi - lo;
      for (var i = n / 2; i >= 1; i = i - 1) {
        downheap(i, n, lo);
      }
      for (var i = n; i > 1; i = i - 1) {
        exchange(lo, lo + i - 1);
        downheap(1, i - 1, lo);
      }
    };

    var downheap = function(i, n, lo) {
      var d = array[lo + i - 1],
      child;

      while (i <= n / 2) {
        child = 2 * i;
        if (child < n && smaller(array[lo + child - 1], array[lo + child])) {
          child++;
        }
        if (!smaller(d, array[lo + child - 1])) break;
        array[lo + i - 1] = array[lo + child - 1];
        i = child;
      }
      array[lo + i - 1] = d;
    };

    var insertionsort = function(lo, hi) {
      var i, j, t;
      for (i = lo; i < hi; i++) {
        j = i;
        t = array[i];
        while (j != lo && smaller(t, array[j - 1])) {
          array[j] = array[j - 1];
          j--;
        }
        array[j] = t;
      }
    };

    var exchange = function(i, j) {
      var tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
      if (assignFn && assignFn.apply) {
        assignFn(array[i], i, array[j], j);
      }
    };

    var floor_lg = function(a) {
      return Math.floor(Math.log(a) / Math.log(2));
    };

    var smaller = function(val1, val2) {
      if (compareFn && compareFn.apply) return compareFn(val1, val2);
      else return val1 < val2;
    };

    introsort_loop(0, array.length, 2 * floor_lg(array.length));
    insertionsort(0, array.length);
    return array;
  };

	introSort.size_threshold = 16;

  if ( typeof window !== "undefined" ){
    if ( window.jQuery )
      window.jQuery.introSort = introSort;
    else
      window.introSort = introSort;
  } else if ( typeof global !== "undefined" ){
    global.introSort = introSort;
  }

})();

