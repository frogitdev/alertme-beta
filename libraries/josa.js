;var Josa = (function(){
  var	_f = [
    function(string) { //을/를 구분
      return _hasJong(string) ? '을' : '를';
    },
    function(string){ //은/는 구분
      return _hasJong(string) ? '은' : '는';
    },
    function(string){ //이/가 구분
      return _hasJong(string) ? '이' : '가';
    }
  ],
    _formats = {
      '을/를' : _f[0],
      '을' : _f[0],
      '를' : _f[0],
      '을를' : _f[0],
      '은/는' : _f[1],
      '은' : _f[1],
      '는' : _f[1],
      '은는' : _f[1],
      '이/가' : _f[2],
      '이' : _f[2],
      '가' : _f[2],
      '이가' : _f[2]
    };

  function _hasJong(string){ //string의 마지막 글자가 받침을 가지는지 확인
    string = string.charCodeAt(string.length - 1);
    return (string - 0xac00) % 28 > 0;
  }

  return {
    c: function(word, format){
       if (typeof _formats[format] === 'undefined') throw 'Invalid format!';
       return _formats[format](word);
     }
  };
})();
