import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaCheck, FaStar, FaInfoCircle } from 'react-icons/fa';

// Pricing data with clear value proposition
const pricingData = [
    {
        id: 'basic',
        name: 'Basic Package',
        price: '299',
        period: 'month',
        features: [
            '10 driving lessons',
            'Theory materials',
            'Basic practice tests',
            'Email support'
        ],
        cta: 'Get Started',
        popular: false,
        color: '#4a90e2'
    },
    {
        id: 'standard',
        name: 'Standard Package',
        price: '499',
        period: 'month',
        features: [
            '20 driving lessons',
            'Theory materials',
            'Unlimited practice tests',
            'Priority support',
            '1 mock exam'
        ],
        cta: 'Best Value',
        popular: true,
        color: '#50c878'
    },
    {
        id: 'premium',
        name: 'Premium Package',
        price: '799',
        period: 'month',
        features: [
            '30 driving lessons',
            'Theory materials',
            'Unlimited practice tests',
            '24/7 support',
            '3 mock exams',
            'Personal instructor'
        ],
        cta: 'Get Premium',
        popular: false,
        color: '#9b59b6'
    }
];

const PricingTable = ({ onSelect }) => {
  const { t } = useTranslation();
    const [hoveredCard, setHoveredCard] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipContent, setTooltipContent] = useState('');

    // Handle card hover (System 1 - Intuitive)
    const handleCardHover = (id) => {
        setHoveredCard(id);
    };

    // Handle feature info (System 2 - Analytical)
    const handleFeatureInfo = (feature) => {
        setTooltipContent(`Learn more about: ${feature}`);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
    };

    // Handle package selection (System 2 - Analytical)
    const handlePackageSelect = (packageId) => {
        if (onSelect) {
            onSelect(packageId);
        }
    };

  return (
        <div className="pricing-table">
            <Row className="justify-content-center">
                {pricingData.map((package_, index) => (
                    <Col key={package_.id} md={4} className="mb-4">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            onHoverStart={() => handleCardHover(package_.id)}
                            onHoverEnd={() => handleCardHover(null)}
                        >
                            <Card 
                                className={`pricing-card ${package_.popular ? 'popular' : ''} ${hoveredCard === package_.id ? 'hovered' : ''}`}
                                style={{ 
                                    borderColor: package_.color,
                                    boxShadow: hoveredCard === package_.id ? `0 10px 20px rgba(0,0,0,0.1)` : 'none'
                                }}
                            >
                                {package_.popular && (
                                    <Badge 
                                        bg="success" 
                                        className="popular-badge"
                                        style={{ backgroundColor: package_.color }}
                                    >
                                        <FaStar /> Most Popular
                                    </Badge>
                                )}
                                <Card.Header 
                                    className="text-center"
                                    style={{ backgroundColor: package_.color, color: 'white' }}
                                >
                                    <Card.Title>{package_.name}</Card.Title>
                                    <div className="price">
                                        <span className="currency">$</span>
                                        <span className="amount">{package_.price}</span>
                                        <span className="period">/{package_.period}</span>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <ul className="features-list">
                                        {package_.features.map((feature, i) => (
                                            <motion.li 
                                                key={i}
                                                whileHover={{ x: 5 }}
                                                onClick={() => handleFeatureInfo(feature)}
                                            >
                                                <FaCheck className="check-icon" style={{ color: package_.color }} />
                                                <span>{feature}</span>
                                                <FaInfoCircle 
                                                    className="info-icon" 
                                                    style={{ color: package_.color }}
                                                />
                                            </motion.li>
                                        ))}
                                    </ul>
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    <Button 
                                        variant={package_.popular ? "primary" : "outline-primary"}
                                        size="lg"
                                        className="w-100"
                                        style={{ 
                                            backgroundColor: package_.popular ? package_.color : 'transparent',
                                            borderColor: package_.color,
                                            color: package_.popular ? 'white' : package_.color
                                        }}
                                        onClick={() => handlePackageSelect(package_.id)}
                                    >
                                        {package_.cta}
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </motion.div>
                    </Col>
                ))}
            </Row>

            {/* Tooltip for feature information */}
            {showTooltip && (
                <motion.div 
                    className="feature-tooltip"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                >
                    {tooltipContent}
                </motion.div>
            )}
        </div>
    );
};

export default PricingTable;
