'use client'
//
//
//
//
//
// import React, {useState} from 'react';
// import {useForm} from 'react-hook-form';

// function UserForm() {
//     const [formsCount, setFormsCount] = useState(1);
//     const {register, handleSubmit, reset} = useForm();
//     const [users, setUsers] = useState([]);
//
//     const onSubmit = (data) => {
//         setUsers([...users, data]);
//         reset();
//     };
//
//     const renderForms = () => {
//         let forms = [];
//         for (let i = 0; i < formsCount; i++) {
//             forms.push(
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <label>نام:</label>
//                     <input type="text" {...register('firstName', {required: true})} />
//
//                     <label>نام خانوادگی:</label>
//                     <input type="text" {...register('lastName', {required: true})} />
//
//                     <label>موبایل:</label>
//                     <input type="text" {...register('phoneNumber', {required: true})} />
//
//                     <button type="submit">افزودن کاربر</button>
//                 </form>
//             )
//             return forms;
//         }
//     };
//
//     const addForm = () => {
//         setFormsCount(formsCount + 1);
//     };
//
//     return (
//         <div>
//             {renderForms()}
//             <button onClick={addForm}>افزودن فرم جدید</button>
//         </div>
//     )
// }
//
// export default UserForm;


//
//
//
// import React, {useState} from "react";
// // import Select from "react-select"
// // import Input from "@material-ui/core/Input"
// interface IFormInput {
//     firstName: string
//     lastName: string
//     iceCreamType: { label: string; value: string }
// }
//
// import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form"
//
// interface IFormValues {
//     "First Name": string
//     Age: number
// }
//
// type InputProps = {
//     label: Path<IFormValues>
//     register: UseFormRegister<IFormValues>
//     required: boolean
// }
//
// // The following component is an example of your existing Input Component
// const Input = ({ label, register, required }: InputProps) => (
//     <>
//         <label>{label}</label>
//         <input {...register(label, { required })} />
//     </>
// )
//
// // you can use React.forwardRef to pass the ref too
// const Select = React.forwardRef<
//     HTMLSelectElement,
//     { label: string } & ReturnType<UseFormRegister<IFormValues>>
// >(({ onChange, onBlur, name, label }, ref) => (
//     <>
//         <label>{label}</label>
//         <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
//             <option value="20">20</option>
//             <option value="30">30</option>
//         </select>
//     </>
// ))
//
// const App = () => {
//     const { register, handleSubmit } = useForm<IFormValues>()
//
//     const onSubmit: SubmitHandler<IFormValues> = (data) => {
//         alert(JSON.stringify(data))
//     }
//
//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <Input label="First Name" register={register} required />
//             <Select label="Age" {...register("Age")} />
//             <input type="submit" />
//         </form>
//     )
// }
//
// export default App
//

// ************************

interface Person{
  name : string,
  phoneNumber : string,
}


import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
  Grid,
  Button,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AddToCard = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Person>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'persons',
  });

  const onSubmit = (data:Person) => {
    console.log('data is : ' , data);
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors && (
            <div>
              {Object.keys(errors).map((key) => (
                  <p key={key} style={{ color: 'red' }}>
                    {errors[key].message}
                  </p>
              ))}
            </div>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">فرم</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
                variant="contained"
                onClick={() => append({ name: '', phone: '' })}
            >
              افزودن فرد جدید
            </Button>
          </Grid>
          {fields.map((field, index) => (
              <React.Fragment key={field.id}>
                <Grid item xs={4}>
                  <Controller
                      name={`name[${index}]`}
                      control={control}
                      rules={{ required: "نام را وارد کنید" }}
                      render={({ field }) => (
                          <TextField
                              {...field}
                              label={`نام فرد ${index + 1}`}
                              fullWidth
                              error={!!errors?.name?.[index]}
                              helperText={errors?.name?.[index]?.message}
                          />
                      )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                      name={`phone[${index}]`}
                      control={control}
                      rules={{
                        required: "شماره تلفن را وارد کنید",
                        pattern: { value: /^\d+$/, message: "شماره تلفن معتبر نیست" }
                      }}
                      render={({ field }) => (
                          <TextField
                              {...field}
                              label={`شماره تلفن فرد ${index + 1}`}
                              fullWidth
                              error={!!errors?.phone?.[index]}
                              helperText={errors?.phone?.[index]?.message}
                          />
                      )}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => remove(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              ارسال
            </Button>
          </Grid>
        </Grid>
      </form>
  );
};

export default AddToCard;

