
import { FieldErrors, useForm} from 'react-hook-form';

interface ILoginForm{
    username?:string;
    password:string;
    email?:string;
    errors?:string;
}

export default function Forms(){
    const {
        register,
        handleSubmit,
        formState:{errors},
        watch,
        setError,
        setValue,
        getValues,
        reset,
        resetField
    }=useForm<ILoginForm>({
        mode:"onChange"
    });
    const onValid=(data:ILoginForm)=>{
        setError('username',{message:'Backend is offeline'});
    }
    const onInvalid=(errors:FieldErrors)=>{
        console.log(errors);
    }
    console.log(errors)

    return  (
        <form onSubmit={handleSubmit(onValid,onInvalid)}>
            <input {...register(
                'username',{
                required:'Username is required',
                minLength:{
                    message:'The username should be longer than 5 chars',
                    value:5
                }
            })}
            type="text"
            placeholder='username'
            />
            {errors.username?.message}
            <input {...register(
                'email',{
                    required:'Email is required',
                    validate:{
                        notNaver:(value)=>
                        !value?.includes('@naver.com') ||'Naver is not allowed',
                    }
                })}
            type="email"
            className={`${Boolean(errors.email?.message)?'border-red-500':''}`}
            />
            {errors.email?.message}
            <input {...register(
                'password',{required:'Password is required'})}
            type="password"
            required
            />
            <button type="submit">등록</button>
            {errors.errors?.message}
        </form>
    )
}