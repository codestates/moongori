import React from "react";
import styled from "styled-components";

export default function Main() {
	return (
		<>
		{/* <div >{`메인페이지none | (en-US) <transform-list>
	where 
	<transform-list> = <transform-function>+ (en-US)

	where 
	<transform-function> = <matrix()> | (en-US) <translate()> | (en-US) <translateX()> | (en-US) <translateY()> | (en-US) <scale()> | (en-US) <scaleX()> | (en-US) <scaleY()> | (en-US) <rotate()> | (en-US) <skew()> | (en-US) <skewX()> | (en-US) <skewY()> | (en-US) <matrix3d()> | (en-US) <translate3d()> | (en-US) <translateZ()> | (en-US) <scale3d()> | (en-US) <scaleZ()> | (en-US) <rotate3d()> | (en-US) <rotateX()> | (en-US) <rotateY()> | (en-US) <rotateZ()> | (en-US) <perspective()>

	where 
	<matrix()> = matrix( <number># (en-US){ (en-US)6} (en-US) )
	<translate()> = translate( <length-percentage> , <length-percentage>? (en-US) )
	<translateX()> = translateX( <length-percentage> )
	<translateY()> = translateY( <length-percentage> )
	<scale()> = scale( <number> , <number>? (en-US) )
	<scaleX()> = scaleX( <number> )
	<scaleY()> = scaleY( <number> )
	<rotate()> = rotate( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<skew()> = skew( [ (en-US) <angle> | (en-US) <zero> ] (en-US) , [ (en-US) <angle> | (en-US) <zero> ] (en-US)? (en-US) )
	<skewX()> = skewX( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<skewY()> = skewY( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<matrix3d()> = matrix3d( <number># (en-US){ (en-US)16} (en-US) )
	<translate3d()> = translate3d( <length-percentage> , <length-percentage> , <length> )
	<translateZ()> = translateZ( <length> )
	<scale3d()> = scale3d( <number> , <number> , <number> )
	<scaleZ()> = scaleZ( <number> )
	<rotate3d()> = rotate3d( <number> , <number> , <number> , [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<rotateX()> = rotateX( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<rotateY()> = rotateY( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<rotateZ()> = rotateZ( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<perspective()> = perspective( <length> )

	where 
	<length-percentage> = <length> | (en-US) <percentage>none | (en-US) <transform-list>
	where 
	<transform-list> = <transform-function>+ (en-US)

	where 
	<transform-function> = <matrix()> | (en-US) <translate()> | (en-US) <translateX()> | (en-US) <translateY()> | (en-US) <scale()> | (en-US) <scaleX()> | (en-US) <scaleY()> | (en-US) <rotate()> | (en-US) <skew()> | (en-US) <skewX()> | (en-US) <skewY()> | (en-US) <matrix3d()> | (en-US) <translate3d()> | (en-US) <translateZ()> | (en-US) <scale3d()> | (en-US) <scaleZ()> | (en-US) <rotate3d()> | (en-US) <rotateX()> | (en-US) <rotateY()> | (en-US) <rotateZ()> | (en-US) <perspective()>

	where 
	<matrix()> = matrix( <number># (en-US){ (en-US)6} (en-US) )
	<translate()> = translate( <length-percentage> , <length-percentage>? (en-US) )
	<translateX()> = translateX( <length-percentage> )
	<translateY()> = translateY( <length-percentage> )
	<scale()> = scale( <number> , <number>? (en-US) )
	<scaleX()> = scaleX( <number> )
	<scaleY()> = scaleY( <number> )
	<rotate()> = rotate( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<skew()> = skew( [ (en-US) <angle> | (en-US) <zero> ] (en-US) , [ (en-US) <angle> | (en-US) <zero> ] (en-US)? (en-US) )
	<skewX()> = skewX( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<skewY()> = skewY( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<matrix3d()> = matrix3d( <number># (en-US){ (en-US)16} (en-US) )
	<translate3d()> = translate3d( <length-percentage> , <length-percentage> , <length> )
	<translateZ()> = translateZ( <length> )
	<scale3d()> = scale3d( <number> , <number> , <number> )
	<scaleZ()> = scaleZ( <number> )
	<rotate3d()> = rotate3d( <number> , <number> , <number> , [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<rotateX()> = rotateX( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<rotateY()> = rotateY( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<rotateZ()> = rotateZ( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<perspective()> = perspective( <length> )

	where 
	<length-percentage> = <length> | (en-US) <percentage>none | (en-US) <transform-list>
	where 
	<transform-list> = <transform-function>+ (en-US)

	where 
	<transform-function> = <matrix()> | (en-US) <translate()> | (en-US) <translateX()> | (en-US) <translateY()> | (en-US) <scale()> | (en-US) <scaleX()> | (en-US) <scaleY()> | (en-US) <rotate()> | (en-US) <skew()> | (en-US) <skewX()> | (en-US) <skewY()> | (en-US) <matrix3d()> | (en-US) <translate3d()> | (en-US) <translateZ()> | (en-US) <scale3d()> | (en-US) <scaleZ()> | (en-US) <rotate3d()> | (en-US) <rotateX()> | (en-US) <rotateY()> | (en-US) <rotateZ()> | (en-US) <perspective()>

	where 
	<matrix()> = matrix( <number># (en-US){ (en-US)6} (en-US) )
	<translate()> = translate( <length-percentage> , <length-percentage>? (en-US) )
	<translateX()> = translateX( <length-percentage> )
	<translateY()> = translateY( <length-percentage> )
	<scale()> = scale( <number> , <number>? (en-US) )
	<scaleX()> = scaleX( <number> )
	<scaleY()> = scaleY( <number> )
	<rotate()> = rotate( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<skew()> = skew( [ (en-US) <angle> | (en-US) <zero> ] (en-US) , [ (en-US) <angle> | (en-US) <zero> ] (en-US)? (en-US) )
	<skewX()> = skewX( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<skewY()> = skewY( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<matrix3d()> = matrix3d( <number># (en-US){ (en-US)16} (en-US) )
	<translate3d()> = translate3d( <length-percentage> , <length-percentage> , <length> )
	<translateZ()> = translateZ( <length> )
	<scale3d()> = scale3d( <number> , <number> , <number> )
	<scaleZ()> = scaleZ( <number> )
	<rotate3d()> = rotate3d( <number> , <number> , <number> , [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<rotateX()> = rotateX( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<rotateY()> = rotateY( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<rotateZ()> = rotateZ( [ (en-US) <angle> | (en-US) <zero> ] (en-US) )
	<perspective()> = perspective( <length> )

	where 
	<length-percentage> = <length> | (en-US) <percentage>`}</div>; */}
		</>
	)
}
