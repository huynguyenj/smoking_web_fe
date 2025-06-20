import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { Formik, Form } from 'formik'

export interface MembershipDialogProp {
  open: boolean
  onClose: () => void
  onSubmit: (values: {
    membership_title: string
    price: number
    featureInput: string
  }) => void
  isEditMode?: boolean
}
function MembershipDialog({ open,
  onClose,
  onSubmit,
  isEditMode = false }: MembershipDialogProp) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Edit Package' : 'Create Package'}</DialogTitle>
      <Formik
        initialValues={{
          membership_title: '',
          price: 0,
          featureInput: ''
        }}
        onSubmit={(values) => {
          onSubmit(values)
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <DialogContent>
              <TextField
                label="Title"
                name="membership_title"
                value={values.membership_title}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price (VND)"
                name="price"
                type="number"
                value={values.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Feature"
                name="featureInput"
                value={values.featureInput}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Hủy</Button>
              <Button type="submit" variant="contained">
                {isEditMode ? 'Cập nhật' : 'Gửi'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

export default MembershipDialog
