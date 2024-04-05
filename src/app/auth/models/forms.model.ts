import { FormControl } from "@angular/forms"

export interface registerFormModel {
  username: FormControl<string | null>,
  email: FormControl<string | null>,
  password: FormControl<string | null>,
  passwordConfirm: FormControl<string | null>
}

export interface loginFormModel {
  email: FormControl<string | null>,
  password: FormControl<string | null>
}
