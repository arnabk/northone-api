import { ITaskSearch } from "@root/types";

const taskRequestBuilder = (searchRequest: ITaskSearch) => {
  const res = searchRequest?.criteria?.map(eCriteria => {
    const field = eCriteria.field;
    const fieldVaule = eCriteria.value;
    const builtRequest: any = {};
    if (field === 'title' || field === 'description') {
      builtRequest[field] = {
        '$regex': fieldVaule,
      };
    } else if (field === 'status' || field === 'dueDate') {
      builtRequest[field] = fieldVaule;
    } else if (field === 'category') {
      builtRequest[field] = {
        $all: fieldVaule.split(','),
      }
    }
    return builtRequest;
  }).reduce((acc, v) => ({ ...acc, ...v }), {});
  return res;
}

export default taskRequestBuilder;
