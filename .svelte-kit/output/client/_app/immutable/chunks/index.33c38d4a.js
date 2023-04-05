import{a0 as r}from"./index.160dc208.js";function a(e){return e<.5?4*e*e*e:.5*Math.pow(2*e-2,3)+1}function u(e,{delay:n=0,duration:f=400,easing:t=r}={}){const o=+getComputedStyle(e).opacity;return{delay:n,duration:f,easing:t,css:s=>`opacity: ${s*o}`}}function y(e,{delay:n=0,speed:f,duration:t,easing:o=a}={}){let s=e.getTotalLength();const c=getComputedStyle(e);return c.strokeLinecap!=="butt"&&(s+=parseInt(c.strokeWidth)),t===void 0?f===void 0?t=800:t=s/f:typeof t=="function"&&(t=t(s)),{delay:n,duration:t,easing:o,css:(p,i)=>`
			stroke-dasharray: ${s};
			stroke-dashoffset: ${i*s};
		`}}export{y as d,u as f};
