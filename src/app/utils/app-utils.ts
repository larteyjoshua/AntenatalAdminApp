export function totalVolumePerDay(data: any[]){

  const groups = data.reduce((groups, readings) => {
    const date = readings.dateAdded.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(readings);
    console.log(groups)
    return groups;
  }, {});

  // Edit: to add it in the array format instead
  const groupArrays = Object.keys(groups).map((date) => {
   const summing = groups[date].map((d:any) => {
      return d.volume
    })
    return {
      date,
      totalVolume: summing.reduce((a:any, b:any) => a + b, 0)
    };
  });
  return groupArrays;
}

export function totalRateFlowPerDay(data: any[]){

  const groups = data.reduce((groups, readings) => {
    const date = readings.dateAdded.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(readings);
    console.log(groups)
    return groups;
  }, {});

  // Edit: to add it in the array format instead
  const groupArrays = Object.keys(groups).map((date) => {
   const summing = groups[date].map((d:any) => {
      return d.waterFlowRate
    })
    return {
      date,
      totalRateFlow: summing.reduce((a:any, b:any) => a + b, 0)
    };
  });
  return groupArrays;
}

export function totalCostPerDate(data: any[]){

  const groups = data.reduce((groups, readings) => {
    const date = readings.dateCreated.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(readings);
    console.log(groups)
    return groups;
  }, {});

  // Edit: to add it in the array format instead
  const groupArrays = Object.keys(groups).map((date) => {
   const summing = groups[date].map((d:any) => {
      return d.totalCost;
    });
    return {
      date,
      totalCost: summing.reduce((a:any, b:any) => a + b, 0)
    };
  });
  return groupArrays;
}

export function totalPaymentDate(data: any[]){

  const groups = data.reduce((groups, readings) => {
    const date = readings.datePaid.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(readings);
    console.log(groups)
    return groups;
  }, {});

  // Edit: to add it in the array format instead
  const groupArrays = Object.keys(groups).map((date) => {
   const summing = groups[date].map((d:any) => {
      return d.amountPaid;
    });
    return {
      date,
      totalPayment: summing.reduce((a:any, b:any) => a + b, 0)
    };
  });
  return groupArrays;
}

