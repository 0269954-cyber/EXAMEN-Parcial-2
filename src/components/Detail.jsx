import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchCoinDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching coin details');
        }
        const data = await response.json();
        setCoin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinDetail();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  if (!coin) return null;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 2 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate(-1)} 
        sx={{ mb: 3 }}
      >
        Back to Coins
      </Button>

      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, p: 2 }}>
        <Box sx={{ width: { xs: '100%', md: '40%' }, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
          <CardMedia
            component="img"
            image={coin.image?.large}
            alt={coin.name}
            sx={{ maxWidth: '250px', objectFit: 'contain' }}
          />
        </Box>
        
        <CardContent sx={{ width: { xs: '100%', md: '60%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            {coin.name} <span style={{ color: 'gray', fontSize: '0.6em' }}>{coin.symbol.toUpperCase()}</span>
          </Typography>
          
          <Typography variant="h6" color="primary" gutterBottom>
            Rank: #{coin.market_cap_rank}
          </Typography>

          <Box sx={{ my: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Price: ${coin.market_data?.current_price?.usd?.toLocaleString()}
            </Typography>
            <Typography variant="body1" sx={{ 
              color: coin.market_data?.price_change_percentage_24h > 0 ? 'green' : 'red',
              fontWeight: 'medium'
            }}>
              24h Change: {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%
            </Typography>
          </Box>

          <Typography variant="body1" gutterBottom>
            <strong>Market Cap:</strong> ${coin.market_data?.market_cap?.usd?.toLocaleString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>All Time High:</strong> ${coin.market_data?.ath?.usd?.toLocaleString()}
          </Typography>
     
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mt: 3, lineHeight: 1.6 }}
            dangerouslySetInnerHTML={{ 
              __html: coin.description?.en?.split('. ').slice(0, 3).join('. ') + '.' 
            }} 
          />
        </CardContent>
      </Card>
    </Box>
  );
};