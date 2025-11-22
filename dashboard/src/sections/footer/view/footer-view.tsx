/* eslint-disable consistent-return */
/* eslint-disable perfectionist/sort-imports */
import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Button,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Stack,
  CircularProgress,
  Switch,
} from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';
import { Scrollbar } from 'src/components/scrollbar';
import { Iconify } from 'src/components/iconify';
import { useDispatch } from 'react-redux';
import {
  getFooterImages,
  getFooterCollections,
  createFooterImage,
  createFooterCollection,
  setFooterCollectionActive,
  uploadImage,
  setFooterImageActive,
} from 'src/redux/apiRequest'; // nhớ thêm hàm setFooterImageActive
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export function FooterView() {
  const dispatch = useDispatch();
  const [images, setImages] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);

  const [selectedCollectionId, setSelectedCollectionId] = useState('');
  const [selectedImages, setSelectedImages] = useState<any[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState('');
  const [newCollection, setNewCollection] = useState({ title: '', description: '' });
  const [selectedCollection, setSelectedCollection] = useState('');
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleGetAll = async () => {
    const imgs = await getFooterImages();
    const cols = await getFooterCollections();
    setImages(imgs.metadata || []);
    setCollections(cols.metadata || []);
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  const handleCreateImage = async () => {
    if (!imageFile) return toast.error(t('footer.pleaseSelectImage'));
    if (!selectedCollection) return toast.error(t('footer.pleaseSelectCollection'));

    setLoading(true);
    try {
      const imageData = await uploadImage(imageFile, 'footer', dispatch);
      const imageUrl = imageData?.img_url;
      if (!imageUrl) return toast.error(t('footer.failedToUploadImage'));

      const payload = {
        url: imageUrl,
        link: imageLink || '',
        collection: selectedCollection,
      };

      const res = await createFooterImage(payload);
      if (res) {
        toast.success('Image added!');
        setOpenImageModal(false);
        setImageFile(null);
        setImageLink('');
        setSelectedCollection('');
      }
    } catch (error) {
      console.error(error);
      toast.error(t('footer.errorAddingImage'));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCollection = async () => {
    if (!newCollection.title) return toast.error(t('footer.titleIsRequired'));
    setLoading(true);
    try {
      const res = await createFooterCollection(newCollection);
      if (res) {
        toast.success(t('footer.collectionCreated'));
        setNewCollection({ title: '', description: '' });
        setOpenCollectionModal(false);
        handleGetAll();
      }
    } catch (err) {
      console.error(err);
      toast.error(t('footer.failedToCreateCollection'));
    } finally {
      setLoading(false);
    }
  };

  const handleSetActive = async (id: string, active: boolean) => {
    await setFooterCollectionActive(id, active);
    handleGetAll();
  };

  const handleViewCollection = (collectionId: string) => {
    const imgs = images.filter((img) => img.collection?._id === collectionId);
    setSelectedImages(imgs);
    setSelectedCollectionId(collectionId);
    setOpenViewModal(true);
  };

  const handleToggleImageActive = async (imgId: string, active: boolean) => {
    try {
      const res = await setFooterImageActive(imgId, active);
      if (res) {
        toast.success(t('footer.updatedImageStatus'));

        // Cập nhật lại danh sách ảnh mới nhất
        const imgs = await getFooterImages();
        const updated = imgs.metadata.filter(
          (img: any) => img.collection?._id === selectedCollectionId
        );

        setSelectedImages(updated); // cập nhật ngay modal
        setImages(imgs.metadata); // cập nhật bảng chính
      }
    } catch (err) {
      toast.error(t('footer.failedToUpdateStatus'));
    }
  };

  return (
    <DashboardContent>
      {/* Header + Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4">{t('footer.footerManagement')}</Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => setOpenImageModal(true)}
          >
            {t('footer.addImage')}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => setOpenCollectionModal(true)}
          >
            {t('footer.addCollection')}
          </Button>
        </Box>
      </Box>

      {/* Collections Table */}
      <Card>
        <Typography variant="h6" sx={{ p: 2 }}>
          {t('footer.collections')}
        </Typography>
        <Scrollbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>{t('footer.title')}</b>
                </TableCell>
                <TableCell>
                  <b>{t('footer.description')}</b>
                </TableCell>
                <TableCell>
                  <b>{t('footer.status')}</b>
                </TableCell>
                <TableCell>
                  <b>{t('footer.actions')}</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collections?.map((col) => (
                <TableRow key={col._id}>
                  <TableCell>{col.title}</TableCell>
                  <TableCell>{col.description}</TableCell>
                  <TableCell>
                    <Typography
                      color={col.active ? 'green' : 'text.secondary'}
                      sx={{ fontWeight: 600 }}
                    >
                      {col.active ? t('footer.active') : t('footer.inactive')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        color="info"
                        onClick={() => handleViewCollection(col._id)}
                      >
                        {t('footer.view')}
                      </Button>
                      <Button
                        variant="contained"
                        color={col.active ? 'error' : 'success'}
                        onClick={() => handleSetActive(col._id, !col.active)}
                      >
                        {col.active ? t('footer.disable') : t('footer.activate')}
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </Card>

      {/* Modal View Images */}
      <Dialog open={openViewModal} onClose={() => setOpenViewModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>{t('footer.viewImagesInCollection')}</DialogTitle>
        <DialogContent>
          {selectedImages.length === 0 ? (
            <Typography variant="body1" sx={{ mt: 2 }}>
              {t('footer.noImagesInCollection')}
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
              {selectedImages.map((img) => (
                <Card
                  key={img._id}
                  sx={{
                    width: 150,
                    p: 1,
                    textAlign: 'center',
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <img
                    src={img.url}
                    alt="footer"
                    style={{
                      width: '100%',
                      height: 100,
                      borderRadius: 8,
                      objectFit: 'cover',
                    }}
                  />
                  <Typography variant="body2" noWrap sx={{ mt: 1 }}>
                    {img.link || '—'}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {img.active ? t('active') : t('inactive')}
                    </Typography>
                    <Switch
                      checked={img.active}
                      onChange={() => handleToggleImageActive(img._id, !img.active)}
                      color="primary"
                      size="small"
                    />
                  </Box>
                </Card>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewModal(false)}>{t('close')}</Button>
        </DialogActions>
      </Dialog>

      {/* Modal Add Image */}
      <Dialog open={openImageModal} onClose={() => setOpenImageModal(false)}>
        <DialogTitle>{t('footer.addImage')}</DialogTitle>
        <DialogContent>
          <TextField
            type="file"
            fullWidth
            InputLabelProps={{ shrink: true }}
            inputProps={{ accept: 'image/*' }}
            onChange={(e) => {
              const fileInput = e.target as HTMLInputElement;
              if (fileInput.files && fileInput.files[0]) setImageFile(fileInput.files[0]);
            }}
          />
          <TextField
            label={t("footer.linkOptional")}
            fullWidth
            sx={{ mt: 2 }}
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
          <TextField
            select
            label={t("footer.collection")}
            fullWidth
            sx={{ mt: 2 }}
            SelectProps={{ native: true }}
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
          >
            <option value="">-- {t("footer.selectCollection")} --</option>
            {collections.map((col) => (
              <option key={col._id} value={col._id}>
                {col.title}
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImageModal(false)}>{t('cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleCreateImage}
            disabled={loading}
            startIcon={loading && <CircularProgress size={18} color="inherit" />}
          >
            {loading ? t('footer.saving') : t('footer.save')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Add Collection */}
      <Dialog open={openCollectionModal} onClose={() => setOpenCollectionModal(false)}>
        <DialogTitle>{t('footer.addCollection')}</DialogTitle>
        <DialogContent>
          <TextField
            label={t("footer.title")}
            fullWidth
            sx={{ mt: 2 }}
            value={newCollection.title}
            onChange={(e) => setNewCollection({ ...newCollection, title: e.target.value })}
          />
          <TextField
            label={t("footer.description")}
            fullWidth
            sx={{ mt: 2 }}
            value={newCollection.description}
            onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCollectionModal(false)}>{t('cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleCreateCollection}
            disabled={loading}
            startIcon={loading && <CircularProgress size={18} color="inherit" />}
          >
            {loading ? t('footer.saving') : t('footer.save')}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
