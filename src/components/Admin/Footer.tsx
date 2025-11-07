import React from 'react';

const FooterAdmin: React.FC = () => {
    const year = new Date().getFullYear()
    return (
        <footer className='p-5 flex flex-col gap-5'>
            <div className="max-w-[1500px] mx-auto flex flex-col gap-4">
                <p className='text-center'>Data provided by <a className='' href="https://spreecommerce.org/docs/api-reference">Spre Ecommerce API</a></p>
                <p className='text-center'>&copy; {year} Spree Commerce DEMO. All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default FooterAdmin;