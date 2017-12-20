const operatorFunctions = {
  '===': function (item1,item2) {
    return item1 === item2;
  },
  '!==': function (item1,item2) {
    return item1 !== item2;
  }
};

export function filterArrayBy() {
  if( arguments.length > 1 && (arguments[0] instanceof Array) ){
    let posts = arguments[0];

    if( posts.length ){
      let args = Array.prototype.slice.call(arguments,1);

      // arg sample: {property: 'deleted', operator: '===', value: false }
      args.map(arg => {
        return posts = posts.filter( post => {
          return operatorFunctions[arg.operator](post[arg.property],arg.value);
        });
      });
    }

    return posts;
  }

  return arguments[0];
}