import { FormControl } from "@angular/forms"

export interface loginFormModel {
  email: FormControl<string | null>,
  password: FormControl<string | null>
}
