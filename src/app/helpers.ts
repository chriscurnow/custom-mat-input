import Dinero from 'dinero.js'
2
3
export function numberWithCommas(x:  Dinero | string | number) {
  console.log('number with commas, x', x)

  switch (typeof(x)) {
    case 'string': 
    const dVal = stringToDinero(x)
    return dVal.toFormat('0.0.00');

    default:
    return '';
  }

  // return x.toFormat('0,0.00')
  // .replace('$', '')




// return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function stringToDinero(x: String): Dinero {
  const decPos = x.indexOf('.')
  // const numDecimals = x.length


  if (decPos === -1 ){
    x = x + '00';
  } else {
    const numDecimals = x.length - 1 - decPos;
    if (numDecimals === 1) {
      x = x + '0'
    }
  }  
  const stringVal = x.replace(/[^\d-]/g, '');
  const numVal: number = parseInt(stringVal);

  const dVal = Dinero({amount: numVal});
   console.log('x', x);
  console.log('decPos', decPos)
  console.log('stringVal', stringVal)
  console.log('numVal', numVal)
  console.log('dVal', dVal)

  return dVal;

 
}