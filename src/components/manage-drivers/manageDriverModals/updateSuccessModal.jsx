import React from 'react'
import { Modal, ModalBody } from 'react-bootstrap'
import Okaybtn from '../../utilits/buttons/okaybtn'

const UpdateSuccessModal = ({ show, onHide = () => { }, okayFn = () => { }, tab }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            dialogClassName='text-center'
            contentClassName='py-4'
            centered
        >
            <ModalBody>
                <h5 className='primary_color mb-4'>
                    {tab} updated successfully!
                </h5>
                <Okaybtn okayFn={okayFn} okay='Okay' className='py-1' />
            </ModalBody>
        </Modal>
    )
}

export default UpdateSuccessModal