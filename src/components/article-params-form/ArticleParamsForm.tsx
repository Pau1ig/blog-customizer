import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useEffect, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	const [selectedFont, setSelectedFont] = useState(articleState.fontFamilyOption);
	const [selectedFontColor, setSelectedFontColor] = useState(articleState.fontColor);
	const [selectedBgColor, setSelectedBgColor] = useState(articleState.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState(articleState.contentWidth);
	const [selectedFontSize, setSelectedFontSize] = useState(articleState.fontSizeOption);

	const sidebarRef = useRef<HTMLDivElement>(null);

	const toggleSidebar = () => setIsSidebarVisible((visible) => !visible);

	const handleReset = () => {
		setArticleState(defaultArticleState);
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBgColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		toggleSidebar();
	};

	const handleSubmit = (ev: React.SyntheticEvent) => {
		ev.preventDefault();
		setArticleState({
			...articleState,
			fontFamilyOption: selectedFont,
			fontColor: selectedFontColor,
			backgroundColor: selectedBgColor,
			contentWidth: selectedContentWidth,
			fontSizeOption: selectedFontSize,
		});
		toggleSidebar();
	};

	const handleClickOutside = (event: MouseEvent) => {
		event.stopPropagation();
		if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
			setIsSidebarVisible(false);
		}
	};

	useEffect(() => {
		if (isSidebarVisible) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isSidebarVisible]);

	return (
		<div ref={sidebarRef}>
			<ArrowButton open={isSidebarVisible} onClick={toggleSidebar} />
			<aside
				className={clsx(
					styles.container,
					isSidebarVisible && styles.container_open
				)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Настройка параметров
					</Text>
					<Select
						selected={selectedFont}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={setSelectedFont}
					/>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={setSelectedFontSize}
						title='Размер шрифта'
					/>
					<Select
						selected={selectedFontColor}
						options={fontColors}
						title='Цвет текста'
						onChange={setSelectedFontColor}
					/>
					<Separator />
					<Select
						selected={selectedBgColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={setSelectedBgColor}
					/>
					<Select
						selected={selectedContentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={setSelectedContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сброс' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};