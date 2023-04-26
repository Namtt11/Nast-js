export const formatDeadline = (deadLine: string | number | Date) =>{
    const deadlineDate = new Date(deadLine);
    const formattedDeadline = deadlineDate.toLocaleDateString('en-GB');
    return formattedDeadline
  }