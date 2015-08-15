// Generated by CoffeeScript 1.9.3
(function() {
  window.CubingNotationParser = {
    isNumber: function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    getIndexOfLastSubAlgMove: function(algorithm) {
      var i, index, len, move;
      index = -1;
      for (i = 0, len = algorithm.length; i < len; i++) {
        move = algorithm[i];
        index++;
        if (move.indexOf("\)") > -1) {
          break;
        }
      }
      return index;
    },
    parse: function(algorithm) {
      var algorithmArr, i, index, len, move, noOfRepeats, noOfSkips, parsedAlgorithm, subAlg, subAlgorithm;
      parsedAlgorithm = [];
      algorithmArr = algorithm.split(" ");
      noOfSkips = 0;
      for (index = i = 0, len = algorithmArr.length; i < len; index = ++i) {
        move = algorithmArr[index];
        if (noOfSkips > 0) {
          noOfSkips--;
        } else {
          if (move.indexOf("\(") > -1) {
            subAlg = algorithmArr.slice(index, algorithmArr.length);
            subAlg = subAlg.slice(0, CubingNotationParser.getIndexOfLastSubAlgMove(subAlg) + 1);
            noOfRepeats = subAlg[subAlg.length - 1].split("\)");
            noOfRepeats = noOfRepeats[noOfRepeats.length - 1];
            if (!noOfRepeats) {
              noOfRepeats = 1;
            }
            subAlg[0] = subAlg[0].replace("\(", "");
            subAlg[subAlg.length - 1] = subAlg[subAlg.length - 1].split(")")[0];
            subAlg = subAlg.filter(Boolean);
            subAlgorithm = {
              algorithm: subAlg,
              repeat: noOfRepeats
            };
            parsedAlgorithm.push(subAlgorithm);
            noOfSkips += subAlg.length - 1;
          } else if (CubingNotationParser.isNumber(move.substr(move.length - 1))) {
            subAlgorithm = {
              algorithm: [move.substr(0, move.length - 1)],
              repeat: move.substr(move.length - 1)
            };
            parsedAlgorithm.push(subAlgorithm);
          } else {
            subAlgorithm = {
              algorithm: [move],
              repeat: 1
            };
            parsedAlgorithm.push(subAlgorithm);
          }
        }
      }
      return parsedAlgorithm;
    }
  };

}).call(this);
