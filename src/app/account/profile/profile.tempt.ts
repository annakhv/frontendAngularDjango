export class profile{
    constructor (
        public birthdate?: string,
        public originCountry?: string,
        public currentCountry?: string,
        public status?:string
    ){}
}

export class education{
    constructor(
        public level:string,
        public institution: string,
        public country: string,
        public startdate?:string,
        public enddate?:string,
       
    ){}
}

export class work{

    constructor(
        public workplace: string,
        public country: string,
        public startdate?:string,
        public enddate?:string,
       

    ){}
}