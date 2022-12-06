import React, { useEffect } from 'react';

const Test = () => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:3000/base/api/test',
        {
          method: 'GET',
          // body: JSON.stringify({
          //   studentDetails,
          //   rating: level,
          //   category,
          // })
        }
      );
      console.log('asdfffff', data)
      const res = await data.json();
      console.log('data', res)
      // myFun();
    }
    fetchData();
  }, []);

  return (
    <div>
      test-page
      {process.env.customKey}
    </div>
  );
}
 
export default Test;