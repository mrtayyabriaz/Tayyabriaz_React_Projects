import React, { useState } from 'react'
import Cbtn from './Cbtn'
import { Delete } from 'lucide-react'

const Calculator = () => {
  const [values, setValues] = useState('')
  const [keyboard, setKeyboard] = useState(true)

  function Calculate() {
    function looseJsonParse(obj) {
      obj = obj.replace("x", "*");
      obj = obj.replace("÷", "/");
      obj = obj.replace("π", "Math.PI");
      obj = obj.replace("√(", "Math.sqrt(");
      obj = obj.replace("cos(", "Math.cos(");
      obj = obj.replace("cosh(", "Math.cosh(");
      obj = obj.replace("sin(", "Math.sin(");
      obj = obj.replace("sinh(", "Math.sinh(");
      obj = obj.replace("tan(", "Math.tan(");
      obj = obj.replace("tanh(", "Math.tanh(");
      obj = obj.replace("ln(", "Math.log(");
      obj = obj.replace("Ln10(", "Math.log10(");
      obj = obj.replace("e(", "Math.exp(");
      // console.log(obj);
      return eval?.(`"use strict";(${obj})`);
    }
    setValues(Math.floor(looseJsonParse(values) * 1000) / 1000)
  }

  function handleSubmit(e) {
    setValues(v => v + e.target.innerText)
    // console.log(values)
  }
  const keypress = ({ key }) => {
    // console.log(key);
    const getkey = (k) => {
      if (k == '*') return 'x';
      if (k == '/') return '÷';
      return k;
    }
    if (key === 1 || key == 2 || key == 3 || key == 4 || key == 5 || key == 6
      || key == 7 || key == 8 || key == 9 || key == 0 || key == '.' || key == '+'
      || key == '-' || key == '*' || key == '/' || key == '(' || key == ')'
    ) {
      key = getkey(key);
      setValues(v => v + key)
    } else if (key === 'Enter' || key == '=') {
      Calculate()
    } else if (key === 'Delete') {
      setValues('')
    } else if (key === 'Backspace') {
      setValues(values.toString().substring(0, values.length - 1))
    }
  }
  return (
    <>
      {keyboard &&
        <div
          onClick={() => { setKeyboard(false) }}
          className="cursor-context-menu fixed text-center w-full text-gray-400 tracking-wider">Type with keyBoard</div>
      }
      <div className='bg-neutral-900'>
        <div className="container mx-auto font-sans z-20 outline-none"
          onKeyDown={(e) => { keypress(e) }} tabIndex="0">
          <div className="bg-neutral-900 flex flex-col justify-end min-w-[320px] w-max h-[85vh]">
            <div className='line-clamp-1 min-w-[320px] tracking-wide h-[10] bg-neutral-900 text-end py-4 text-4xl pe-2'>{values}</div>
            <div className='h-max bg-neutral-800 pt-3 flex flex-col md:flex-row'>
              <div className="grid grid-cols-4 border-b-2 md:border-r-2 md:border-b-0 border-neutral-700 border-solid">
                <Cbtn btn={'('} onClick={(e) => handleSubmit(e)} />
                <Cbtn btn={')'} onClick={(e) => handleSubmit(e)} />
                <Cbtn btn={'AC'} onClick={() => setValues('')} modifier={true} />
                <Cbtn btn={<Delete />} onClick={() => setValues(values.toString().substring(0, values.length - 1))} modifier={true} />
                <Cbtn btn={'sin'} onClick={() => setValues(v => v + 'sin(')} />
                <Cbtn btn={'cos'} onClick={() => setValues(v => v + 'cos(')} />
                <Cbtn btn={'tan'} onClick={() => setValues(v => v + 'tan(')} />
                <Cbtn btn={'√'} onClick={() => setValues(v => v + '√(')} />
                <Cbtn btn={'sinh'} onClick={() => setValues(v => v + 'sinh(')} />
                <Cbtn btn={'cosh'} onClick={() => setValues(v => v + 'cosh(')} />
                <Cbtn btn={'tanh'} onClick={() => setValues(v => v + 'tanh(')} />
                <Cbtn btn={'e'} onClick={() => setValues(v => v + 'e(')} />
                <Cbtn btn={'ln'} onClick={() => setValues(v => v + 'ln(')} />
                <Cbtn btn={'ln10'} onClick={() => setValues(v => v + 'Ln10(')} />
                <Cbtn btn={'π'} onClick={(e) => handleSubmit(e)} />
                <Cbtn btn={'%'} onClick={(e) => handleSubmit(e)} />
              </div>
              <div className="grid grid-cols-4">
                <Cbtn btn={'7'} onClick={(e) => handleSubmit(e)} />
                <Cbtn btn={'8'} onClick={(e) => handleSubmit(e)} />
                <Cbtn btn={'9'} onClick={(e) => handleSubmit(e)} />
                <Cbtn btn={'÷'} onClick={() => setValues(v => v + '÷')} childclass={'text-2xl'} modifier={true} />
                <Cbtn btn={'4'} onClick={(e) => handleSubmit(e)} />
                <Cbtn btn={'5'} onClick={(e) => handleSubmit(e)} />
                <Cbtn btn={'6'} onClick={(e) => handleSubmit(e)} />
                <Cbtn btn={'X'} onClick={() => setValues(v => v + 'x')} modifier={true} />
                <Cbtn btn={'1'} onClick={(e) => handleSubmit(e)} />
                <Cbtn btn={'2'} onClick={(e) => handleSubmit(e)} />
                <Cbtn btn={'3'} onClick={(e) => handleSubmit(e)} />
                <Cbtn btn={'-'} onClick={(e) => handleSubmit(e)} childclass={'text-2xl'} modifier={true} />
                <Cbtn btn={'0'} onClick={(e) => handleSubmit(e)} />
                <Cbtn btn={'.'} onClick={(e) => handleSubmit(e)} />
                <Cbtn btn={'='} onClick={() => Calculate()}
                  // className={' col-span-2'}
                  childclass={' bg-green-600 hover:bg-green-700'} />
                <Cbtn btn={'+'} onClick={(e) => handleSubmit(e)} childclass={'text-2xl'} modifier={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Calculator