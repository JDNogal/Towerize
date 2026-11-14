// ==================== v329 · Logros: trofeo en su metal también para los logros que se definen después de logros_niveles.js ====================
// (p. ej. «Era Fantástica/Distópica completada», de amenazas.js, salían con el trofeo genérico)
for(const id in ACH){const A=ACH[id],d=Object.getOwnPropertyDescriptor(A,'ic');if(!d)Object.defineProperty(A,'ic',{get:()=>trofIcL(achLv(id)),configurable:true});}
