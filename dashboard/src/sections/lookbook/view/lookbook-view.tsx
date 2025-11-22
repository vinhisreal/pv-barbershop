/* eslint-disable consistent-return */
/* eslint-disable perfectionist/sort-imports */
import { use, useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';
import {
  getLookbookImages,
  getLookbookCollections,
  createLookbookImage,
  createLookbookCollection,
  setLookbookCollectionActive,
  uploadImage,
  setLookbookImageActive,
} from 'src/redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export function LookbookView() {
  const [images, setImages] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);

  const [selectedCollectionId, setSelectedCollectionId] = useState('');
  const [selectedImages, setSelectedImages] = useState<any[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('');
  const [newCollection, setNewCollection] = useState({ name: '', description: '' });

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch(); // Placeholder for dispatch if needed
  // === Fetch toàn bộ data ===
  const handleGetAll = async () => {
    const imgs = await getLookbookImages();
    const cols = await getLookbookCollections();
    setImages(imgs?.metadata || []);
    setCollections(cols?.metadata || []);
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  const { t } = useTranslation();
  // === Thêm ảnh mới ===
  const handleCreateImage = async () => {
    if (!imageFile) return toast.error(t('lookbook.pleaseSelectAnImage'));
    if (!selectedCollection) return toast.error(t('lookbook.pleaseSelectACollection'));

    setLoading(true);
    try {
      const imageData = await uploadImage(imageFile, 'lookbook', dispatch);
      const imageUrl = imageData?.img_url;
      if (!imageUrl) return toast.error(t('lookbook.failedToUploadImage'));

      const payload = {
        url: imageUrl,
        link: imageLink || '',
        collection: selectedCollection,
      };

      const res = await createLookbookImage(payload);
      if (res) {
        toast.success(t('lookbook.imageAdded'));
        setOpenImageModal(false);
        setImageFile(null);
        setImageLink('');
        setSelectedCollection('');
        handleGetAll();
      }
    } catch (error) {
      console.error(error);
      toast.error(t('lookbook.errorAddingImage'));
    } finally {
      setLoading(false);
    }
  };

  // === Thêm collection mới ===
  const handleCreateCollection = async () => {
    if (!newCollection.name) return toast.error(t('lookbook.collectionNameRequired'));
    setLoading(true);
    try {
      const res = await createLookbookCollection(newCollection);
      if (res) {
        toast.success(t('lookbook.collectionCreated'));
        setNewCollection({ name: '', description: '' });
        setOpenCollectionModal(false);
        handleGetAll();
      }
    } catch (err) {
      console.error(err);
      toast.error(t('lookbook.failedToCreateCollection'));
    } finally {
      setLoading(false);
    }
  };

  // === Kích hoạt / vô hiệu collection ===
  const handleSetActive = async (id: string, active: boolean) => {
    await setLookbookCollectionActive(id, active);
    handleGetAll();
  };

  // === Xem ảnh trong collection ===
  const handleViewCollection = (collectionId: string) => {
    const imgs = images.filter((img) => img.collection?._id === collectionId);
    setSelectedImages(imgs);
    setSelectedCollectionId(collectionId);
    setOpenViewModal(true);
  };

  // === Bật/tắt ảnh ===
  const handleToggleImageActive = async (imgId: string, active: boolean) => {
    try {
      const res = await setLookbookImageActive(imgId, active);
      if (res) {
        toast.success('Updated image status');
        const imgs = await getLookbookImages();
        const updated = imgs.metadata.filter(
          (img: any) => img.collection?._id === selectedCollectionId
        );
        setSelectedImages(updated);
        setImages(imgs.metadata);
      }
    } catch (err) {
      toast.error(t('lookbook.failedToUpdateImageStatus'));
    }
  };

  // === JSX render ===
  return (
    <DashboardContent>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">{t('lookbook.management')}</Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => setOpenImageModal(true)}
          >
            {t('lookbook.addImage')}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => setOpenCollectionModal(true)}
          >
            {t('lookbook.addCollection')}
          </Button>
        </Box>
      </Box>

      {/* Collections Table */}
      <Card>
        <Typography variant="h6" sx={{ p: 2 }}>
          {t('lookbook.collections')}
        </Typography>
        <Scrollbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>{t('lookbook.name')}</b>
                </TableCell>
                <TableCell>
                  <b>{t('lookbook.description')}</b>
                </TableCell>
                <TableCell>
                  <b>{t('lookbook.status')}</b>
                </TableCell>
                <TableCell>
                  <b>{t('lookbook.actions')}</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collections?.map((col) => (
                <TableRow key={col._id}>
                  <TableCell>{col.name}</TableCell>
                  <TableCell>{col.description}</TableCell>
                  <TableCell>
                    <Typography
                      color={col.active ? 'green' : 'text.secondary'}
                      sx={{ fontWeight: 600 }}
                    >
                      {col.active ? t('lookbook.active') : t('lookbook.inactive')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        color="info"
                        onClick={() => handleViewCollection(col._id)}
                      >
                        {t('lookbook.view')}
                      </Button>
                      <Button
                        variant="contained"
                        color={col.active ? 'error' : 'success'}
                        onClick={() => handleSetActive(col._id, !col.active)}
                      >
                        {col.active ? t('lookbook.disable') : t('lookbook.activate')}
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </Card>

      {/* Modal xem ảnh */}
      <Dialog open={openViewModal} onClose={() => setOpenViewModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>{t('lookbook.viewImagesInCollection')}</DialogTitle>
        <DialogContent>
          {selectedImages.length === 0 ? (
            <Typography variant="body1" sx={{ mt: 2 }}>
              {t('lookbook.noImagesInCollection')}
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
              {selectedImages.map((img) => (
                <Card key={img._id} sx={{ width: 150, p: 1, textAlign: 'center', borderRadius: 2 }}>
                  <img
                    src={img.url}
                    alt="lookbook"
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
                      {img.active ? t('lookbook.active') : t('lookbook.inactive')}
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
          <Button onClick={() => setOpenViewModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Modal thêm ảnh */}
      <Dialog open={openImageModal} onClose={() => setOpenImageModal(false)}>
        <DialogTitle>{t('lookbook.addImage')}</DialogTitle>
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
            label={t('lookbook.linkOptional')}
            fullWidth
            sx={{ mt: 2 }}
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
          <TextField
            select
            label={t('lookbook.collection')}
            fullWidth
            sx={{ mt: 2 }}
            SelectProps={{ native: true }}
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
          >
            <option value="">-- {t('lookbook.selectCollection')} --</option>
            {collections.map((col) => (
              <option key={col._id} value={col._id}>
                {col.name}
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
            {loading ? t('lookbook.saving') : t('save')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal thêm collection */}
      <Dialog open={openCollectionModal} onClose={() => setOpenCollectionModal(false)}>
        <DialogTitle>{t('lookbook.addLookbookCollection')}</DialogTitle>
        <DialogContent>
          <TextField
            label={t('lookbook.collectionName')}
            fullWidth
            sx={{ mt: 2 }}
            value={newCollection.name}
            onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
          />
          <TextField
            label={t('lookbook.collectionDescription')}
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
            {loading ? t('lookbook.saving') : t('lookbook.save')}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
