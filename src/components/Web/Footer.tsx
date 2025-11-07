import React from 'react';

const FooterWeb: React.FC = () => {
    const year = new Date().getFullYear()
    return (
        <footer className='p-5 flex flex-col gap-5'>
            <div className='max-w-[1500px] mx-auto flex gap-0 md:gap-6 md:flex-row flex-col'>
                <div className='flex justify-center flex-grow py-2 md:py-0 border-b md:border-none lg:w-60'>
                    <img className="w-auto h-[56px] custom-desktop-height "
                        alt="Spree Commerce DEMO logo"
                        src="../../LogoFullBlack.webp" />
                    <div className='grid grid-cols-1 lg:grid-cols-4 grow w-full'>
                        <div className='flex-grow gap-1 flex flex-col py-6 md:py-0 border-b md:border-none border-default'></div>
                        <div className='flex-grow gap-1 flex flex-col py-6 md:py-0 border-b md:border-none border-default'></div>
                        <div className='flex-grow gap-1 flex flex-col py-6 md:py-0 border-b md:border-none border-default'></div>
                    </div>
                    <div className='flex-grow gap-4 flex flex-col justify-between lg:w-60'></div>
                </div>
            </div>
            <div className="max-w-[1500px] mx-auto flex flex-col gap-4">
                <p className='text-center'>Data provided by <a className='' href="https://spreecommerce.org/docs/api-reference">Spre Ecommerce API</a></p>
                <p className='text-center'>&copy; {year} Spree Commerce DEMO. All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default FooterWeb;