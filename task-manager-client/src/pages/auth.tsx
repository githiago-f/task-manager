import { FormEventHandler, useState } from "react";
import { login } from "../data/auth.fetcher";
import { catchError, from, map } from "rxjs";

export function AuthPage() {
    const [errors, setErrors] = useState<string[]>([]);

    const submitAuthForm: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const fields = e.currentTarget.elements;
        const email = (fields.namedItem('email') as {value:string}).value,
            password = (fields.namedItem('password') as {value:string}).value;
        console.log({email, password});
        from(login({email, password}))
            .pipe(
                map(i => i.access_token),
                catchError(e => {
                    console.error(e);
                    setErrors([e.message])
                    return from([]);
                })
            ).subscribe(token => {
                console.log(token);
            });
        return true;
    };


    return (
        <section className="container">
            <form className="mt-5 mx-auto card p-3" style={{maxWidth: '600px'}} onSubmit={submitAuthForm}>
                <div className="mb-3">
                    <label 
                        htmlFor="email" 
                        className="form-label"
                    >E-mail</label>
                    <input 
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                    />
                </div>
                <div className="mb-3">
                    <label 
                        htmlFor="password" 
                        className="form-label"
                    >Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        name="password" 
                        id="password"
                    />
                </div>
                <p hidden={errors.length < 1} className="text-danger">
                    {errors.map((i, idx) => <span key={idx}>{i}<br/></span>)}
                </p>
                <div className="mb-1">
                    <button className="btn btn-success">Login</button>
                </div>
            </form>
        </section>
    );
}
