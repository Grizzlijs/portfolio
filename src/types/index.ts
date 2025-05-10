export interface Experience {
  company: string;
  duration: string;
  roles: Role[];
  skills: string[];
}

export interface Role {
  title: string;
  period: string;
  location: string;
  duration: string;
}

export interface Skill {
  category: string;
  icon: string;
  items: string[];
}

export interface TechStack {
  name: string;
  icon: string;
  color: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  recaptchaResponse: string;
}
