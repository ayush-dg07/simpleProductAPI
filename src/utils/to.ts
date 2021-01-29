const to = (promise: any) => {
    return promise
      .then( (data: any) => {
        return [null, data];
      })
      .catch( (err: any) => [err]);
  };

export default to;